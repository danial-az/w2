package ir.hamgit.formbuilder.service;

import ir.hamgit.formbuilder.data.repository.*;
import ir.hamgit.formbuilder.dataModel.*;
import ir.hamgit.formbuilder.dto.FormSubmissionRequest;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FormSubmissionService {

    private final FormRepository formRepository;
    private final UserRepository userRepository;
    private final FormResponseRepository formResponseRepository;
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    @Transactional
    public void submitForm(FormSubmissionRequest request) {
        Form form = formRepository.findById(request.getFormId())
                .orElseThrow(() -> new EntityNotFoundException("Form not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        FormResponse response = new FormResponse();
        response.setForm(form);
        response.setUser(user);
        response.setSubmittedAt(LocalDateTime.now());

        FormResponse savedResponse = formResponseRepository.save(response);

        List<Answer> answers = request.getAnswerDTOS().stream().map(dto -> {
            Answer answer = new Answer();
            answer.setFormResponse(savedResponse);
            answer.setQuestion(questionRepository.findById(dto.getQuestionId()).orElseThrow());
            answer.setValue(dto.getValue());
            return answer;
        }).toList();

        answerRepository.saveAll(answers);
    }
}

