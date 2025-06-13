package ir.hamgit.formbuilder.service;

import ir.hamgit.formbuilder.data.repository.*;
import ir.hamgit.formbuilder.dataModel.*;
import ir.hamgit.formbuilder.dto.FormResponseDTO;
import ir.hamgit.formbuilder.dto.FormSubmissionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FormResponseService {

    private final FormRepository formRepository;
    private final FormResponseRepository formResponseRepository;
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    public void submitForm(FormSubmissionRequest request) {
        Form form = formRepository.findById(request.getFormId())
                .orElseThrow(() -> new RuntimeException("Form not found"));

        if (!form.isPublished()) {
            throw new RuntimeException("Form is not published");
        }

        FormResponse formResponse = FormResponse.builder()
                .form(form)
                .build();

        FormResponse savedResponse = formResponseRepository.save(formResponse);

        List<Answer> answers = new ArrayList<>();

        for (Map.Entry<String, Object> entry : request.getData().entrySet()) {
            Long questionId = Long.parseLong(entry.getKey());
            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            Answer answer = Answer.builder()
                    .question(question)
                    .formResponse(savedResponse)
                    .value(entry.getValue().toString())
                    .build();

            answers.add(answerRepository.save(answer));
        }

        savedResponse.setAnswers(answers);
    }

    public List<FormResponseDTO> getFormResponses(Long formId) {
        List<FormResponse> responses = formResponseRepository.findByFormId(formId);
        return responses.stream()
                .map(response -> {
                    FormResponseDTO dto = FormResponseDTO.fromEntity(response);
                    Map<String, Object> data = response.getAnswers().stream()
                            .collect(Collectors.toMap(
                                    answer -> answer.getQuestion().getId().toString(),
                                    Answer::getValue
                            ));
                    dto.setData(data);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public void deleteByFormId(Long formId) {
        formResponseRepository.deleteByFormId(formId);
    }
}