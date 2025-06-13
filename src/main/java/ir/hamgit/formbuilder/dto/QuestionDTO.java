package ir.hamgit.formbuilder.dto;

import ir.hamgit.formbuilder.dataModel.Question; import ir.hamgit.formbuilder.dataModel.QuestionType; import lombok.AllArgsConstructor; import lombok.Builder; import lombok.Data; import lombok.NoArgsConstructor;

import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor public class QuestionDTO { private Long id; private String type; private String label; private String placeholder; private boolean required; private List<OptionDTO> options; private String description; private ValidationDTO validation;

public static QuestionDTO fromEntity(Question question) {
    QuestionDTO dto = QuestionDTO.builder()
            .id(question.getId())
            .type(question.getType().name())
            .label(question.getLabel())
            .placeholder(question.getPlaceholder())
            .required(question.isRequired())
            .description(question.getDescription())
            .build();

    // Parse options if exists
    if (question.getOptions() != null && !question.getOptions().isEmpty()) {
        dto.setOptions(OptionDTO.parseOptions(question.getOptions()));
    }

    // Parse validation if exists
    if (question.getValidation() != null && !question.getValidation().isEmpty()) {
        dto.setValidation(ValidationDTO.parseValidation(question.getValidation()));
    }

    return dto;
}
public Question toEntity() { String optionStr = null; try { if (this.options != null && !this.options.isEmpty()) { optionStr = OptionDTO.optionsToString(this.options); } } catch (Exception e) { System.out.println("❌ خطا در تبدیل گزینه‌ها به JSON: " + e.getMessage()); }

QuestionType questionType;
try {
    questionType = QuestionType.valueOf(this.type);
} catch (Exception e) {
    throw new IllegalArgumentException("❌ نوع سوال نامعتبر است: " + this.type);
}

return Question.builder()
        .type(questionType)
        .label(this.label)
        .placeholder(this.placeholder)
        .required(this.required)
        .description(this.description)
        .options(optionStr)
        .validation(this.validation != null ? this.validation.toString() : null)
        .build();
} }

