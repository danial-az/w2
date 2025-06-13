package ir.hamgit.formbuilder.controller;

import ir.hamgit.formbuilder.dataModel.User;
import ir.hamgit.formbuilder.dto.UserDTO;
import ir.hamgit.formbuilder.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        try {
            User user = userService.register(
                    userDTO.getUsername(),
                    userDTO.getEmail(),
                    userDTO.getPassword()
            );
            return ResponseEntity.ok(UserDTO.fromEntity(user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("خطای داخلی سرور در ثبت‌نام");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            User user = userService.login(
                    userDTO.getEmail(),
                    userDTO.getPassword()
            );
            return ResponseEntity.ok(UserDTO.fromEntity(user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("خطای داخلی سرور در ورود");
        }
    }
}