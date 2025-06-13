package ir.hamgit.formbuilder.dto;

import ir.hamgit.formbuilder.dataModel.FormResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormResponseDTO {
    private Long id;
    private Long formId;
    private Map<String, Object> data;
    private LocalDateTime submittedAt;
    private String submittedBy;

    public static FormResponseDTO fromEntity(FormResponse response) {
        return FormResponseDTO.builder()
                .id(response.getId())
                .formId(response.getForm().getId())
                .submittedAt(response.getSubmittedAt())
                .submittedBy(response.getUser() != null ? response.getUser().getUsername() : null)
                .build();
    }
}