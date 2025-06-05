package ir.hamgit.formbuilder.controller;

import ir.hamgit.formbuilder.data.repository.UserRepository;
import ir.hamgit.formbuilder.dataModel.User;
import ir.hamgit.formbuilder.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Adjust in production to only allow frontend origin
public class UserController {

    private final UserRepository userRepository;

    /**
     * Get a list of all users (excluding sensitive info)
     */
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> dtoList = userRepository.findAll().stream().map(user -> {
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setEmail(user.getEmail());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

    /**
     * Create a new user
     */
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        // Mapping DTO to entity
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword()); // WARNING: store hashed password in real apps

        // Save to DB
        User savedUser = userRepository.save(user);

        // Map back to DTO
        UserDTO resultDTO = UserDTO.fromEntity(savedUser);

        // Return response with 201 Created
        return ResponseEntity
                .created(URI.create("/api/users/" + savedUser.getId()))
                .body(resultDTO);
    }
}
