package ir.hamgit.formbuilder.controller;

import ir.hamgit.formbuilder.data.repository.FormRepository;
import ir.hamgit.formbuilder.data.repository.QuestionRepository;
import ir.hamgit.formbuilder.dataModel.Form;
import ir.hamgit.formbuilder.dataModel.Question;
import ir.hamgit.formbuilder.dto.QuestionDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // or restrict to specific frontend origin
public class QuestionController {

    private final QuestionRepository questionRepository;
    private final FormRepository formRepository;

    /** Create a new question for a form */
    @PostMapping
    public ResponseEntity<QuestionDTO> createQuestion(@Valid @RequestBody QuestionDTO dto) {
        Form form = formRepository.findById(dto.getFormId())
                .orElseThrow(() -> new IllegalArgumentException("Form not found"));

        Question question = new Question();
        question.setLabel(dto.getLabel());
        question.setType(dto.getType());
        question.setRequired(dto.isRequired());
        question.setForm(form);

        Question saved = questionRepository.save(question);
        return ResponseEntity.ok(QuestionDTO.fromEntity(saved));
    }

    /** Optionally add: Get all questions for a form */
    @GetMapping("/form/{formId}")
    public ResponseEntity<?> getQuestionsByForm(@PathVariable Long formId) {
        Form form = formRepository.findById(formId)
                .orElseThrow(() -> new IllegalArgumentException("Form not found"));

        var questionDTOs = questionRepository.findByFormId(formId)
                .stream()
                .map(QuestionDTO::fromEntity)
                .toList();

        return ResponseEntity.ok(questionDTOs);
    }
}
