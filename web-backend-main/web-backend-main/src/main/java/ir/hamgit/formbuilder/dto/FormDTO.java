package ir.hamgit.formbuilder.dto;

import ir.hamgit.formbuilder.dataModel.Form;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class FormDTO {
    private Long id;
    private String title;
    private String description;
    private Long userId;
    private boolean published;
    private List<QuestionDTO> questions;

    public static FormDTO fromEntity(Form form) {
        FormDTO dto = new FormDTO();
        dto.setId(form.getId());
        dto.setTitle(form.getTitle());
        dto.setDescription(form.getDescription());
        dto.setPublished(form.isPublished());
        dto.setUserId(form.getOwner().getId());
        dto.setQuestions(form.getQuestions()
                .stream()
                .map(QuestionDTO::fromEntity)
                .collect(Collectors.toList()));
        return dto;
    }
}