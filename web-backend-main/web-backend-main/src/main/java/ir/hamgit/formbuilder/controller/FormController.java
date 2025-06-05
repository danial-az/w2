package ir.hamgit.formbuilder.controller;

import ir.hamgit.formbuilder.data.repository.FormRepository;
import ir.hamgit.formbuilder.data.repository.UserRepository;
import ir.hamgit.formbuilder.dataModel.Form;
import ir.hamgit.formbuilder.dataModel.User;
import ir.hamgit.formbuilder.dto.FormDTO;
import ir.hamgit.formbuilder.dto.FormSubmissionRequest;
import ir.hamgit.formbuilder.service.FormSubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/forms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // or configure allowed frontend origins
public class FormController {

    private final FormRepository formRepository;
    private final UserRepository userRepository;
    private final FormSubmissionService formSubmissionService;

    /** Get all forms of a specific user */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FormDTO>> getFormsByUser(@PathVariable Long userId) {
        List<FormDTO> forms = formRepository.findByOwnerId(userId)
                .stream()
                .map(FormDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(forms);
    }

    /** Create a new form for a user */
    @PostMapping("/user/{userId}")
    public ResponseEntity<FormDTO> createForm(
            @PathVariable Long userId,
            @Valid @RequestBody FormDTO formDTO) {

        User user = userRepository.findById(userId).orElseThrow();
        Form form = new Form();
        form.setTitle(formDTO.getTitle());
        form.setDescription(formDTO.getDescription());
        form.setOwner(user);

        Form saved = formRepository.save(form);
        return ResponseEntity.ok(FormDTO.fromEntity(saved));
    }

    /** Get a single form by ID */
    @GetMapping("/{formId}")
    public ResponseEntity<FormDTO> getFormById(@PathVariable Long formId) {
        Form form = formRepository.findById(formId).orElseThrow();
        return ResponseEntity.ok(FormDTO.fromEntity(form));
    }

    /** Update an existing form */
    @PutMapping("/{formId}")
    public ResponseEntity<FormDTO> updateForm(
            @PathVariable Long formId,
            @Valid @RequestBody FormDTO formDTO) {

        Form form = formRepository.findById(formId).orElseThrow();

        form.setTitle(formDTO.getTitle());
        form.setDescription(formDTO.getDescription());
        form.setPublished(formDTO.isPublished());

        Form updated = formRepository.save(form);
        return ResponseEntity.ok(FormDTO.fromEntity(updated));
    }

    /** Delete a form by ID */
    @DeleteMapping("/{formId}")
    public ResponseEntity<Void> deleteForm(@PathVariable Long formId) {
        formRepository.deleteById(formId);
        return ResponseEntity.noContent().build();
    }

    /** Submit form response */
    @PostMapping("/{formId}/submit")
    public ResponseEntity<?> submitForm(
            @PathVariable Long formId,
            @Valid @RequestBody FormSubmissionRequest request) {

        request.setFormId(formId);
        formSubmissionService.submitForm(request);
        return ResponseEntity.ok().body("Form submitted successfully.");
    }
}
