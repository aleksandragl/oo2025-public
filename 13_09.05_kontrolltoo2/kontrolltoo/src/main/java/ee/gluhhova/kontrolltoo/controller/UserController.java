package ee.gluhhova.kontrolltoo.controller;

import ee.gluhhova.kontrolltoo.entity.User;
import ee.gluhhova.kontrolltoo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // uusi kasutajaid näha
    @GetMapping("/users/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Võimalda kasutajaid läbi Hibernate-i (Repository - Pagination) sorteerida nime järgi ja lehekülgede kaupa näha.
    @GetMapping("/users")
    public Page<User> getUsersPaginated(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "5") int size,
                                        @RequestParam(defaultValue = "name,asc") String sort) {
        // Парсим параметр sort, например "name,asc"
        String[] sortParams = sort.split(",");
        String sortField = sortParams[0];
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
        return userRepository.findAll(pageable);
    }

    // b) Võimalda kasutajaid üksikuna (detailsemalt) näha ja teda muuta.
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // lisada
    @PostMapping("/users")
    public List<User> addUser(@RequestBody User user) {
        if (user.getId() != null) {
            throw new RuntimeException("New user cannot have id");
        }
        userRepository.save(user);
        return userRepository.findAll();
    }

    // изменено: теперь путь содержит /users/{id} вместо просто /{id}
    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        if (!id.equals(user.getId())) {
            throw new RuntimeException("ID mismatch");
        }
        return userRepository.save(user);
    }

    //
    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        if (user.getId() == null) {
            throw new RuntimeException("User id required to update");
        }
        return userRepository.save(user);
    }

    //  kustutada
    @DeleteMapping("/users/{id}")
    public List<User> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return userRepository.findAll();
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        String email = loginUser.getEmail();
        String password = loginUser.getPassword();

        if (email == null || email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail puudub");
        }

        if (password == null || password.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Parool puudub");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("E-mail on vale");
        }

        User user = userOpt.get();
        if (!password.equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Parool on vale");
        }

        return ResponseEntity.ok("Sisselogimine õnnestus");
    }
}
