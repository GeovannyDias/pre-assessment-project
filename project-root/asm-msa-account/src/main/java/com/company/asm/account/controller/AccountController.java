package com.company.asm.account.controller;

import com.company.asm.account.api.controller.*;
import com.company.asm.account.api.model.*;
import com.company.asm.account.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class AccountController implements 
        CreateAccountApi,
        DeleteAccountByAccountIdApi,
        GetAccountByAccountIdApi,
        ListAccountsApi,
        ListAccountsByCustomerIdApi,
        UpdateAccountByAccountIdApi,
        PartialUpdateAccountByAccountIdApi {

    private final AccountService accountService;

    @Override
    public ResponseEntity<List<AccountOutput>> getAccountsListByCustomerIdResponse(UUID customerId) {
        return ResponseEntity.ok(accountService.getAccountsByCustomerId(customerId));
    }

    @Override
    public ResponseEntity<AccountOutput> postAccountCreateRequest(@Valid AccountInput accountInput) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(accountService.createAccount(accountInput));
    }

    @Override
    public ResponseEntity<List<AccountOutput>> getAccountsListResponse() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @Override
    public ResponseEntity<AccountOutput> getAccountByAccountIdResponse(UUID accountId) {
        return ResponseEntity.ok(accountService.getAccountById(accountId));
    }

    @Override
    public ResponseEntity<AccountOutput> putAccountUpdateByAccountIdRequest(
            UUID accountId, 
            @Valid AccountInput accountInput) {
        return ResponseEntity.ok(accountService.updateAccount(accountId, accountInput));
    }

    @Override
    public ResponseEntity<AccountOutput> patchAccountUpdateByAccountIdRequest(
            UUID accountId, 
            @Valid AccountPatchInput accountPatchInput) {
        return ResponseEntity.ok(accountService.patchAccount(accountId, accountPatchInput));
    }

    @Override
    public ResponseEntity<MessageResponse> deleteAccountByAccountIdRequest(UUID accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.ok(new MessageResponse().message("La cuenta fue eliminada correctamente."));
    }
}