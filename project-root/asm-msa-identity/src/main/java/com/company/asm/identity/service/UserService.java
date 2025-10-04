package com.company.asm.identity.service;

import com.company.asm.identity.api.model.LoginInput;
import com.company.asm.identity.api.model.UserInput;
import com.company.asm.identity.api.model.UserOutput;
import com.company.asm.identity.api.model.UserPatchInput;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UserOutput createUser(UserInput userInput);
    List<UserOutput> listUsers();
    UserOutput getUserById(UUID userId);
    UserOutput updateUser(UUID userId, UserPatchInput userPatchInput);
    void deleteUser(UUID userId);
    String login(LoginInput loginInput);
}