package ir.hamgit.formbuilder.controller;

import ir.hamgit.formbuilder.data.repository.*;
import ir.hamgit.formbuilder.dataModel.Answer;
import ir.hamgit.formbuilder.dataModel.Form;
import ir.hamgit.formbuilder.dataModel.FormResponse;
import ir.hamgit.formbuilder.dataModel.Question;
import ir.hamgit.formbuilder.dto.AnswerDTO;
import ir.hamgit.formbuilder.dto.FormResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/responses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Replace * with frontend origin in production
public class ResponseController {

    private final FormResponseRepository responseRepository;
    private final AnswerRepository answerRepository;
    private final FormRepository formRepository;
    private final QuestionRepository questionRepository;

    /** Submit a new form response */
    @PostMapping
    public ResponseEntity<String> submitResponse(@Valid @RequestBody FormResponseDTO dto) {
        Form form = formRepository.findById(dto.getFormId())
                .orElseThrow(() -> new IllegalArgumentException("Form not found"));

        FormResponse response = new FormResponse();
        response.setForm(form);

        FormResponse savedResponse = responseRepository.save(response);

        for (AnswerDTO a : dto.getAnswers()) {
            Question question = questionRepository.findById(a.getQuestionId())
                    .orElseThrow(() -> new IllegalArgumentException("Question not found"));

            Answer answer = new Answer();
            answer.setValue(a.getValue());
            answer.setQuestion(question);
            answer.setFormResponse(savedResponse);

            answerRepository.save(answer);
        }

        return ResponseEntity.ok("Form submitted successfully.");
    }

    /** Get all responses for a specific form */
    @GetMapping("/form/{formId}")
    public ResponseEntity<List<FormResponseDTO>> getResponsesByForm(@PathVariable Long formId) {
        List<FormResponse> responses = responseRepository.findByFormId(formId);

        List<FormResponseDTO> dtos = responses.stream().map(response -> {
            FormResponseDTO dto = new FormResponseDTO();
            dto.setId(response.getId());
            dto.setFormId(response.getForm().getId());

            List<AnswerDTO> answers = answerRepository.findByFormResponse(response).stream().map(answer -> {
                AnswerDTO answerDTO = new AnswerDTO();
                answerDTO.setId(answer.getId());
                answerDTO.setValue(answer.getValue());
                answerDTO.setQuestionId(answer.getQuestion().getId());
                return answerDTO;
            }).collect(Collectors.toList());

            dto.setAnswers(answers);
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
