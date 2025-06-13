package ir.hamgit.formbuilder.service;

import ir.hamgit.formbuilder.data.repository.UserRepository;
import ir.hamgit.formbuilder.dataModel.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public User register(String username, String email, String password) {
        if (findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("ایمیل قبلاً ثبت شده است.");
        }

        User user = User.builder()
                .username(username)
                .email(email)
                .password(password)
                .build();

        return userRepository.save(user);
    }

    public User login(String email, String password) {
        Optional<User> userOpt = findByEmail(email);
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            throw new IllegalArgumentException("ایمیل یا رمز عبور اشتباه است.");
        }

        return userOpt.get();
    }
}