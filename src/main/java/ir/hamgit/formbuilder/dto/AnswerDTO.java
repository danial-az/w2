package ir.hamgit.formbuilder.dto;

import ir.hamgit.formbuilder.dataModel.Answer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDTO {
    private Long id;
    private String value;
    private Long questionId;
    
    public static AnswerDTO fromEntity(Answer answer) {
        return AnswerDTO.builder()
                .id(answer.getId())
                .value(answer.getValue())
                .questionId(answer.getQuestion() != null ? answer.getQuestion().getId() : null)
                .build();
    }
}