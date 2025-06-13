package ir.hamgit.formbuilder.config;

import ir.hamgit.formbuilder.dataModel.*;
import ir.hamgit.formbuilder.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final FormRepository formRepository;
    private final FormResponseRepository formResponseRepository;

    @Override
    public void run(String... args) {

        /* -------- ایجاد کاربر آزمایشی -------- */
        User testUser = userRepository.findByUsername("testuser")
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .username("testuser")
                                .email("test@example.com")
                                .password("password123")
                                .build()
                ));

        /* -------- فرم شماره ۱: فرم ثبت‌نام رویداد -------- */
        Form eventForm = Form.builder()
                .title("فرم ثبت‌نام رویداد جاوا")
                .description("لطفاً اطلاعات خود را برای شرکت در رویداد وارد کنید")
                .published(true)
                .owner(testUser) // سمتِ ManyToOne
                .build();

        Question evQ1 = Question.builder()
                .label("نام کامل")
                .type(QuestionType.text)
                .required(true)
                .placeholder("مثلاً علی رضایی")
                .form(eventForm)
                .build();

        Question evQ2 = Question.builder()
                .label("ایمیل")
                .type(QuestionType.email)
                .required(true)
                .placeholder("example@mail.com")
                .validation("email")
                .form(eventForm)
                .build();

        Question evQ3 = Question.builder()
                .label("سمت شغلی")
                .type(QuestionType.select)
                .options("""
                    [
                      {"id": "1", "label": "دانشجو", "value": "دانشجو"},
                      {"id": "2", "label": "برنامه‌نویس", "value": "برنامه‌نویس"},
                      {"id": "3", "label": "مدیر", "value": "مدیر"},
                      {"id": "4", "label": "سایر", "value": "سایر"}
                    ]
                """)
                .required(false)
                .form(eventForm)
                .build();

        eventForm.setQuestions(List.of(evQ1, evQ2, evQ3));

        /* -------- فرم شماره ۲: نظرسنجی رضایت -------- */
        Form feedbackForm = Form.builder()
                .title("نظرسنجی رضایت کاربران")
                .description("ما را در بهبود سرویس یاری کنید")
                .published(true)
                .owner(testUser)
                .build();

        Question fbQ1 = Question.builder()
                .label("کیفیت کلی سرویس را چگونه ارزیابی می‌کنید؟")
                .type(QuestionType.radio)
                .options("""
                    [
                      {"id": "1", "label": "عالی", "value": "عالی"},
                      {"id": "2", "label": "خوب", "value": "خوب"},
                      {"id": "3", "label": "متوسط", "value": "متوسط"},
                      {"id": "4", "label": "ضعیف", "value": "ضعیف"}
                    ]
                """)
                .required(true)
                .form(feedbackForm)
                .build();

        Question fbQ2 = Question.builder()
                .label("آیا مجدداً از ما خرید می‌کنید؟")
                .type(QuestionType.checkbox)
                .options("""
                    [
                      {"id": "1", "label": "بله", "value": "بله"}
                    ]
                """)
                .required(false)
                .form(feedbackForm)
                .build();

        Question fbQ3 = Question.builder()
                .label("پیشنهاد یا انتقاد")
                .type(QuestionType.textarea)
                .required(false)
                .placeholder("نظرات خود را بنویسید...")
                .form(feedbackForm)
                .build();

        feedbackForm.setQuestions(List.of(fbQ1, fbQ2, fbQ3));

        /* ذخیره دو فرم به همراه سؤالات (Cascade ALL) */
        formRepository.saveAll(List.of(eventForm, feedbackForm));

        /* -------- پاسخ نمونه به فرم اول -------- */
        FormResponse resp1 = FormResponse.builder()
                .form(eventForm)
                .user(testUser)
                .build();

        Answer a1 = Answer.builder().question(evQ1).value("علی رضایی").formResponse(resp1).build();
        Answer a2 = Answer.builder().question(evQ2).value("ali@test.com").formResponse(resp1).build();
        Answer a3 = Answer.builder().question(evQ3).value("برنامه‌نویس").formResponse(resp1).build();

        resp1.setAnswers(List.of(a1, a2, a3));

        /* -------- پاسخ نمونه به فرم دوم -------- */
        FormResponse resp2 = FormResponse.builder()
                .form(feedbackForm)
                .user(testUser)
                .build();

        Answer b1 = Answer.builder().question(fbQ1).value("عالی").formResponse(resp2).build();
        Answer b2 = Answer.builder().question(fbQ2).value("بله").formResponse(resp2).build();
        Answer b3 = Answer.builder().question(fbQ3).value("همه‌چیز عالی بود، فقط سرعت بهتر شود.").formResponse(resp2).build();

        resp2.setAnswers(List.of(b1, b2, b3));

        /* ذخیره پاسخ‌‌ها (Answerها به دلیل Cascade ذخیره می‌شوند) */
        formResponseRepository.saveAll(List.of(resp1, resp2));

        System.out.println("داده‌های آزمایشی با موفقیت درج شد.");
    }
}