package com.company.asm.identity.service.impl;

import com.company.asm.identity.api.model.LoginInput;
import com.company.asm.identity.api.model.UserInput;
import com.company.asm.identity.api.model.UserOutput;
import com.company.asm.identity.api.model.UserPatchInput;
import com.company.asm.identity.domain.User;
import com.company.asm.identity.exception.UserNotFoundException;
import com.company.asm.identity.repository.UserRepository;
import com.company.asm.identity.service.UserService;
import com.company.asm.identity.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public UserOutput createUser(UserInput userInput) {
        User user = userMapper.toEntity(userInput);
        user = userRepository.save(user);
        return userMapper.toOutput(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserOutput> listUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toOutput)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserOutput getUserById(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        return userMapper.toOutput(user);
    }

    @Override
    @Transactional
    public UserOutput updateUser(UUID userId, UserPatchInput userPatchInput) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        
        userMapper.updateUserFromPatchInput(userPatchInput, user);
        user = userRepository.save(user);
        return userMapper.toOutput(user);
    }

    @Override
    @Transactional
    public void deleteUser(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }

    @Override
    public String login(LoginInput loginInput) {
        // TODO: Implement login logic and JWT token generation
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
    }
}