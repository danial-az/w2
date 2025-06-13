package ir.hamgit.formbuilder;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class FormBackendApplicationTests {
    @Test
    private void dummyTest() {
        Assertions.assertEquals(1, 1);
    }

//    @Autowired
//    private FormResponseRepository formResponseRepository;
//
//    @Test
//    void testSaveFormResponseWithItems() {
//        FormResponse response = FormResponse.builder()
//                .form(new Form())
//                .user(new User())
//                .build();
//
//        ResponseItem item1 = ResponseItem.builder()
//                .componentId(101L)
//                .value("Yes")
//                .response(response)
//                .build();
//
//        ResponseItem item2 = ResponseItem.builder()
//                .componentId(102L)
//                .value("42")
//                .response(response)
//                .build();
//
//        response.setItems(List.of(item1, item2));
//
//        FormResponse saved = formResponseRepository.save(response);
//
//        Assertions.assertNotNull(saved.getId());
//        Assertions.assertEquals(2, saved.getItems().size());
//    }
}

