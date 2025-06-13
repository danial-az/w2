package ir.hamgit.formbuilder.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ValidationDTO {
    private Integer minLength;
    private Integer maxLength;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static ValidationDTO parseValidation(String validationJson) {
        try {
            return objectMapper.readValue(validationJson, ValidationDTO.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    @Override
    public String toString() {
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}