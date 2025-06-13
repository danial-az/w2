package ir.hamgit.formbuilder.controller;

import ir.hamgit.formbuilder.dto.FormResponseDTO;
import ir.hamgit.formbuilder.service.FormResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forms/{formId}/responses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FormResponseController {

    private final FormResponseService formResponseService;

    @GetMapping
    public ResponseEntity<List<FormResponseDTO>> getFormResponses(@PathVariable Long formId) {
        List<FormResponseDTO> responses = formResponseService.getFormResponses(formId);
        return ResponseEntity.ok(responses);
    }
}