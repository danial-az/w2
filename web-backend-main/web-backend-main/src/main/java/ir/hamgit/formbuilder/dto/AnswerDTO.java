package ir.hamgit.formbuilder.dto;

import ir.hamgit.formbuilder.dataModel.Answer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerDTO {
    private Long id;
    private String value;
    private Long questionId;
    private Long formResponseId;

    public static AnswerDTO fromEntity(Answer answer) {
        AnswerDTO dto = new AnswerDTO();
        dto.setId(answer.getId());
        dto.setValue(answer.getValue());
        dto.setQuestionId(answer.getQuestion().getId());
        dto.setFormResponseId(answer.getFormResponse().getId());
        return dto;
    }
}
