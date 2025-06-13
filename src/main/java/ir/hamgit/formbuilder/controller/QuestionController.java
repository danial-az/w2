package ir.hamgit.formbuilder.controller;

import ir.hamgit.formbuilder.data.repository.QuestionRepository;
import ir.hamgit.formbuilder.dto.QuestionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionRepository questionRepository;

    @GetMapping("/form/{formId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByFormId(@PathVariable Long formId) {
        List<QuestionDTO> questions = questionRepository.findByFormId(formId)
                .stream()
                .map(QuestionDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(questions);
    }
}