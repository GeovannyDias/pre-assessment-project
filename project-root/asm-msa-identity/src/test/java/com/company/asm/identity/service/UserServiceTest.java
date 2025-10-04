package com.company.asm.identity.service;

import com.company.asm.identity.api.model.LoginInput;
import com.company.asm.identity.api.model.UserInput;
import com.company.asm.identity.api.model.UserOutput;
import com.company.asm.identity.domain.User;
import com.company.asm.identity.exception.UserNotFoundException;
import com.company.asm.identity.repository.UserRepository;
import com.company.asm.identity.service.impl.UserServiceImpl;
import com.company.asm.identity.service.mapper.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserServiceImpl(userRepository, userMapper);
    }

    @Test
    void createUser_Success() {
        // Arrange
        UserInput userInput = new UserInput();
        userInput.setUsername("testuser");
        userInput.setPasswordHash("hashed123");

        User user = User.builder()
                .idUser(UUID.randomUUID())
                .username("testuser")
                .passwordHash("hashed123")
                .createdAt(OffsetDateTime.now())
                .updatedAt(OffsetDateTime.now())
                .build();

        UserOutput expected = new UserOutput();
        expected.setIdUser(user.getIdUser());
        expected.setUsername(user.getUsername());

        when(userMapper.toEntity(userInput)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toOutput(user)).thenReturn(expected);

        // Act
        UserOutput actual = userService.createUser(userInput);

        // Assert
        assertNotNull(actual);
        assertEquals(expected.getIdUser(), actual.getIdUser());
        assertEquals(expected.getUsername(), actual.getUsername());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void listUsers_Success() {
        // Arrange
        List<User> users = Arrays.asList(
            User.builder().idUser(UUID.randomUUID()).username("user1").build(),
            User.builder().idUser(UUID.randomUUID()).username("user2").build()
        );

        List<UserOutput> expected = Arrays.asList(
            new UserOutput().idUser(users.get(0).getIdUser()).username("user1"),
            new UserOutput().idUser(users.get(1).getIdUser()).username("user2")
        );

        when(userRepository.findAll()).thenReturn(users);
        when(userMapper.toOutput(users.get(0))).thenReturn(expected.get(0));
        when(userMapper.toOutput(users.get(1))).thenReturn(expected.get(1));

        // Act
        List<UserOutput> actual = userService.listUsers();

        // Assert
        assertNotNull(actual);
        assertEquals(2, actual.size());
        assertEquals(expected.get(0).getIdUser(), actual.get(0).getIdUser());
        assertEquals(expected.get(1).getIdUser(), actual.get(1).getIdUser());
    }

    @Test
    void getUserById_Success() {
        // Arrange
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .idUser(userId)
                .username("testuser")
                .build();

        UserOutput expected = new UserOutput();
        expected.setIdUser(userId);
        expected.setUsername("testuser");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.toOutput(user)).thenReturn(expected);

        // Act
        UserOutput actual = userService.getUserById(userId);

        // Assert
        assertNotNull(actual);
        assertEquals(expected.getIdUser(), actual.getIdUser());
        assertEquals(expected.getUsername(), actual.getUsername());
    }

    @Test
    void getUserById_NotFound() {
        // Arrange
        UUID userId = UUID.randomUUID();
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
    }

    @Test
    void login_Success() {
        // Arrange
        LoginInput loginInput = new LoginInput();
        loginInput.setUsername("testuser");
        loginInput.setPassword("password123");

        // Act
        String token = userService.login(loginInput);

        // Assert
        assertNotNull(token);
        assertTrue(token.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"));
    }
}