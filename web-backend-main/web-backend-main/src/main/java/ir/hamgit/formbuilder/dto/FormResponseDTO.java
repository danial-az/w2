package ir.hamgit.formbuilder.dto;

import ir.hamgit.formbuilder.dataModel.Form;
import ir.hamgit.formbuilder.dataModel.FormResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class FormResponseDTO {
    private Long id;
    private Long formId;
    private List<AnswerDTO> answers;

    public static FormResponseDTO fromEntity(FormResponse response) {
        FormResponseDTO dto = new FormResponseDTO();
        dto.setId(response.getId());
        dto.setFormId(response.getForm().getId());
        dto.setAnswers(response.getAnswers()
                .stream()
                .map(AnswerDTO::fromEntity)
                .collect(Collectors.toList()));
        return dto;
    }
}