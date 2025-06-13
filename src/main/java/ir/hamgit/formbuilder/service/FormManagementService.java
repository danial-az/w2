package ir.hamgit.formbuilder.service;

import ir.hamgit.formbuilder.dataModel.Form;
import ir.hamgit.formbuilder.dataModel.User;
import ir.hamgit.formbuilder.dto.FormDTO;
import ir.hamgit.formbuilder.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FormManagementService {

    private final FormService formService;
    private final QuestionService questionService;
    private final FormResponseService formResponseService;
    private final UserRepository userRepository;

    public FormDTO createForm(Long userId, FormDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Form form = new Form();
        form.setTitle(dto.getTitle());
        form.setDescription(dto.getDescription());
        form.setPublished(false);
        form.setOwner(user);

        Form saved = formService.save(form);

        if (dto.getFields() != null && !dto.getFields().isEmpty()) {
            questionService.saveQuestionsForForm(dto.getFields(), saved);
        }

        return FormDTO.fromEntity(saved);
    }

    public FormDTO updateForm(Long formId, FormDTO dto) {
        Form form = formService.findFormById(formId);
        form.setTitle(dto.getTitle());
        form.setDescription(dto.getDescription());
        form.setPublished(dto.isPublished());

        if (dto.getFields() != null) {
            questionService.updateQuestionsForForm(dto.getFields(), form);
        }

        Form updated = formService.save(form);
        return FormDTO.fromEntity(updated);
    }

    public void deleteFormCompletely(Long formId) {
        formResponseService.deleteByFormId(formId);
        Form form = formService.findFormById(formId);
        formService.deleteForm(form);
    }
}