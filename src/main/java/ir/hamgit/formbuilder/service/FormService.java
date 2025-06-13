package ir.hamgit.formbuilder.service;

import ir.hamgit.formbuilder.data.repository.FormRepository;
import ir.hamgit.formbuilder.data.repository.FormResponseRepository;
import ir.hamgit.formbuilder.dto.FormDTO;
import ir.hamgit.formbuilder.dataModel.Form;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FormService {

    private final FormRepository formRepository;
    private final FormResponseRepository formResponseRepository;

    public List<FormDTO> getUserForms(Long userId) {
        return formRepository.findByOwnerId(userId)
                .stream()
                .map(form -> {
                    FormDTO dto = FormDTO.fromEntity(form);
                    dto.setResponsesCount(formResponseRepository.countByFormId(form.getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public FormDTO getFormById(Long formId) {
        Form form = formRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("Form not found"));
        FormDTO dto = FormDTO.fromEntity(form);
        dto.setResponsesCount(formResponseRepository.countByFormId(form.getId()));
        return dto;
    }

    public Form togglePublish(Form form) {
        form.setPublished(!form.isPublished());
        return formRepository.save(form);
    }

    public void deleteForm(Form form) {
        formRepository.delete(form);
    }

    public Form save(Form form) {
        return formRepository.save(form);
    }

    public Form findFormById(Long formId) {
        return formRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("Form not found"));
    }
}