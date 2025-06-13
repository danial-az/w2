package ir.hamgit.formbuilder.controller;

import ir.hamgit.formbuilder.dto.FormDTO;
import ir.hamgit.formbuilder.dto.FormSubmissionRequest;
import ir.hamgit.formbuilder.service.FormService;
import ir.hamgit.formbuilder.service.FormResponseService;
import ir.hamgit.formbuilder.service.FormManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FormController {

    private final FormService formService;
    private final FormResponseService formResponseService;
    private final FormManagementService formManagementService;

    @GetMapping
    public ResponseEntity<String> testBasicRoute() {
        return ResponseEntity.ok("Form API is working!");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FormDTO>> getFormsByUser(@PathVariable Long userId) {
        List<FormDTO> forms = formService.getUserForms(userId);
        return ResponseEntity.ok(forms);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<FormDTO> createForm(
            @PathVariable Long userId,
            @Valid @RequestBody FormDTO formDTO) {
        FormDTO created = formManagementService.createForm(userId, formDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{formId}")
    public ResponseEntity<FormDTO> getFormById(@PathVariable Long formId) {
        FormDTO form = formService.getFormById(formId);
        return ResponseEntity.ok(form);
    }

    @PutMapping("/{formId}")
    public ResponseEntity<FormDTO> updateForm(
            @PathVariable Long formId,
            @Valid @RequestBody FormDTO formDTO) {
        FormDTO updated = formManagementService.updateForm(formId, formDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{formId}")
    public ResponseEntity<Void> deleteForm(@PathVariable Long formId) {
        formManagementService.deleteFormCompletely(formId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{formId}/toggle-publish")
    public ResponseEntity<FormDTO> togglePublishForm(@PathVariable Long formId) {
        var updatedForm = formService.togglePublish(formService.findFormById(formId));
        FormDTO dto = FormDTO.fromEntity(updatedForm);
        dto.setResponsesCount(formService.getFormById(formId).getResponsesCount());
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{formId}/submit")
    public ResponseEntity<?> submitForm(
            @PathVariable Long formId,
            @Valid @RequestBody FormSubmissionRequest request) {
        request.setFormId(formId);
        formResponseService.submitForm(request);
        return ResponseEntity.ok().body("Form submitted successfully.");
    }
}