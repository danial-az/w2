package ir.hamgit.formbuilder.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
public class FormSubmissionRequest {

    @NotNull(message = "formId is required")
    private Long formId;

    @NotNull(message = "userId is required")
    private Long userId;

    @NotNull(message = "responses are required")
    @Size(min = 1, message = "At least one response is required")
    private List<@Valid AnswerDTO> answerDTOS;
}

