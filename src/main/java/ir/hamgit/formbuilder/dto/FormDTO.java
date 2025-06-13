package ir.hamgit.formbuilder.dto;

import ir.hamgit.formbuilder.dataModel.Form;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormDTO {
    private Long id;
    private String title;
    private String description;
    private boolean published;
    private Long userId;
    private List<QuestionDTO> fields;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int responsesCount;

    public static FormDTO fromEntity(Form form) {
        return FormDTO.builder()
                .id(form.getId())
                .title(form.getTitle())
                .description(form.getDescription())
                .published(form.isPublished())
                .userId(form.getOwner() != null ? form.getOwner().getId() : null)
                .fields(form.getQuestions() != null ? 
                    form.getQuestions().stream()
                        .map(QuestionDTO::fromEntity)
                        .collect(Collectors.toList()) : null)
                .responsesCount(0) // Will be calculated in service
                .build();
    }
}