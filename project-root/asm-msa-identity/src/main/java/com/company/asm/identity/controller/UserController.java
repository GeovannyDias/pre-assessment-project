package com.company.asm.identity.controller;

import com.company.asm.identity.api.controller.*;
import com.company.asm.identity.api.model.*;
import com.company.asm.identity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserController implements CreateUserApi, DeleteUserByUserIdApi, GetUserByUserIdApi, 
                                    ListUsersApi, LoginApi, PartialUpdateUserByUserIdApi {

    private final UserService userService;

    @Override
    public ResponseEntity<UserOutput> postUserCreateRequest(UserInput userInput) {
        return ResponseEntity.ok(userService.createUser(userInput));
    }

    @Override
    public ResponseEntity<List<UserOutput>> getUsersListResponse() {
        return ResponseEntity.ok(userService.listUsers());
    }

    @Override
    public ResponseEntity<UserOutput> getUserByIdResponse(UUID userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @Override
    public ResponseEntity<UserOutput> patchUserUpdateByIdRequest(UUID userId, UserPatchInput userPatchInput) {
        return ResponseEntity.ok(userService.updateUser(userId, userPatchInput));
    }

    @Override
    public ResponseEntity<MessageResponse> deleteUserByIdRequest(UUID userId) {
        userService.deleteUser(userId);
        MessageResponse response = new MessageResponse();
        response.setMessage("User deleted successfully");
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<LoginResponse> postLoginRequest(PostLoginRequestRequest postLoginRequestRequest) {
        LoginInput loginInput = new LoginInput();
        loginInput.setUsername(postLoginRequestRequest.getUsername());
        loginInput.setPassword(postLoginRequestRequest.getPassword());
        
        String token = userService.login(loginInput);
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        return ResponseEntity.ok(response);
    }
}