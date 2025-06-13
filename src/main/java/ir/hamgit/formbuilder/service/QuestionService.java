package ir.hamgit.formbuilder.service;

import ir.hamgit.formbuilder.data.repository.AnswerRepository;
import ir.hamgit.formbuilder.data.repository.QuestionRepository;
import ir.hamgit.formbuilder.dataModel.Form;
import ir.hamgit.formbuilder.dataModel.Question;
import ir.hamgit.formbuilder.dataModel.QuestionType;
import ir.hamgit.formbuilder.dto.OptionDTO;
import ir.hamgit.formbuilder.dto.QuestionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public void saveQuestionsForForm(List<QuestionDTO> questionDTOs, Form form) {
        form.getQuestions().clear();
        for (QuestionDTO dto : questionDTOs) {
            Question q = dto.toEntity();
            form.addQuestion(q);
            questionRepository.save(q);
        }
    }

    public void updateQuestionsForForm(List<QuestionDTO> questionDTOs, Form form) {
        Map<Long, Question> currentMap = form.getQuestions()
                .stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        for (QuestionDTO dto : questionDTOs) {
            if (dto.getId() != null && currentMap.containsKey(dto.getId())) {
                Question q = currentMap.get(dto.getId());
                q.setLabel(dto.getLabel());
                q.setRequired(dto.isRequired());
                if (dto.getType() != null) {
                    q.setType(QuestionType.valueOf(dto.getType()));
                }
                if (dto.getOptions() != null) {
                    q.setOptions(OptionDTO.optionsToString(dto.getOptions()));
                }
                questionRepository.save(q);
                currentMap.remove(dto.getId());
            } else if (dto.getId() == null) {
                Question newQ = dto.toEntity();
                form.addQuestion(newQ);
                questionRepository.save(newQ);
            }
        }

        for (Question obsolete : currentMap.values()) {
            if (!answerRepository.existsByQuestionId(obsolete.getId())) {
                form.getQuestions().remove(obsolete);
                questionRepository.delete(obsolete);
            }
        }
    }

    public void deleteQuestionsByFormId(Long formId) {
        questionRepository.deleteByFormId(formId);
    }
}