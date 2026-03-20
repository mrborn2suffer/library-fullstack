package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.model.User;
import com.example.library.repository.BookRepository;
import com.example.library.repository.UserRepository;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class UserController {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public UserController(UserRepository userRepository, BookRepository bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<User> me(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return userRepository.findByEmail(principal.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/cart")
    public ResponseEntity<List<Book>> getCart(Principal principal) {
        Optional<User> opt = userFromPrincipal(principal);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = opt.get();
        List<Book> books = bookRepository.findAllById(user.getCartBookIds());
        return ResponseEntity.ok(books);
    }

    @PostMapping("/cart/{bookId}")
    public ResponseEntity<?> addToCart(Principal principal, @PathVariable @NotBlank String bookId) {
        Optional<User> opt = userFromPrincipal(principal);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (!bookRepository.existsById(bookId)) {
            return ResponseEntity.notFound().build();
        }
        User user = opt.get();
        Set<String> cart = user.getCartBookIds();
        cart.add(bookId);
        user.setCartBookIds(cart);
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/cart/{bookId}")
    public ResponseEntity<?> removeFromCart(Principal principal, @PathVariable @NotBlank String bookId) {
        Optional<User> opt = userFromPrincipal(principal);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = opt.get();
        Set<String> cart = user.getCartBookIds();
        cart.remove(bookId);
        user.setCartBookIds(cart);
        userRepository.save(user);
        return ResponseEntity.noContent().build();
    }

    private Optional<User> userFromPrincipal(Principal principal) {
        if (principal == null) {
            return Optional.empty();
        }
        return userRepository.findByEmail(principal.getName());
    }
}

