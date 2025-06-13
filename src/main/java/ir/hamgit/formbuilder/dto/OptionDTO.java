package ir.hamgit.formbuilder.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OptionDTO {
    private String id;
    private String label;
    private String value;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static List<OptionDTO> parseOptions(String optionsJson) {
        try {
            return objectMapper.readValue(optionsJson, 
                objectMapper.getTypeFactory().constructCollectionType(List.class, OptionDTO.class));
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    public static String optionsToString(List<OptionDTO> options) {
        try {
            return objectMapper.writeValueAsString(options);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}