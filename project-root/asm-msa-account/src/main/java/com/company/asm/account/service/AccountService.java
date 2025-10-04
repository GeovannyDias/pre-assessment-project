package com.company.asm.account.service;

import com.company.asm.account.api.model.AccountInput;
import com.company.asm.account.api.model.AccountOutput;
import com.company.asm.account.api.model.AccountPatchInput;

import java.util.List;
import java.util.UUID;

public interface AccountService {
    List<AccountOutput> getAllAccounts();
    List<AccountOutput> getAccountsByCustomerId(UUID customerId);
    AccountOutput getAccountById(UUID accountId);
    AccountOutput createAccount(AccountInput accountInput);
    AccountOutput updateAccount(UUID accountId, AccountInput accountInput);
    AccountOutput patchAccount(UUID accountId, AccountPatchInput accountPatch);
    void deleteAccount(UUID accountId);
}