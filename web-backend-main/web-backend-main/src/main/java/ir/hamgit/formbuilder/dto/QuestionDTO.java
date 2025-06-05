package ir.hamgit.formbuilder.dto;

import ir.hamgit.formbuilder.dataModel.Question;
import ir.hamgit.formbuilder.dataModel.QuestionType;
import lombok.*;

@Getter
@Setter
public class QuestionDTO {
    private Long id;
    private String label;
    private QuestionType type;
    private boolean required;
    private Long formId;

    public static QuestionDTO fromEntity(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setLabel(question.getLabel());
        dto.setType(question.getType());
        dto.setRequired(question.isRequired());
        dto.setFormId(question.getForm().getId());
        return dto;
    }
}

