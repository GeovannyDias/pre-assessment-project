package com.company.asm.account.service.impl;

import com.company.asm.account.api.model.AccountInput;
import com.company.asm.account.api.model.AccountOutput;
import com.company.asm.account.api.model.AccountPatchInput;
import com.company.asm.account.domain.Account;
import com.company.asm.account.exception.AccountNotFoundException;
import com.company.asm.account.exception.DuplicateAccountNumberException;
import com.company.asm.account.repository.AccountRepository;
import com.company.asm.account.service.AccountService;
import com.company.asm.account.service.mapper.AccountMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;

    @Override
    public List<AccountOutput> getAllAccounts() {
        return accountMapper.toDtoList(accountRepository.findAll());
    }

    @Override
    public List<AccountOutput> getAccountsByCustomerId(UUID customerId) {
        List<Account> accounts = accountRepository.findByCustomerId(customerId);
        if (accounts.isEmpty()) {
            throw new AccountNotFoundException("No se encontraron cuentas para el cliente con ID: " + customerId);
        }
        return accountMapper.toDtoList(accounts);
    }

    @Override
    public AccountOutput getAccountById(UUID accountId) {
        return accountRepository.findById(accountId)
                .map(accountMapper::toOutput)
                .orElseThrow(() -> new AccountNotFoundException("Cuenta no encontrada con ID: " + accountId));
    }

    @Override
    public AccountOutput createAccount(AccountInput accountInput) {
        if (accountRepository.existsByAccountNumber(accountInput.getAccountNumber())) {
            throw new DuplicateAccountNumberException("Ya existe una cuenta con el número: " + accountInput.getAccountNumber());
        }
        Account account = accountMapper.toEntity(accountInput);
        return accountMapper.toOutput(accountRepository.save(account));
    }

    @Override
    public AccountOutput updateAccount(UUID accountId, AccountInput accountInput) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Cuenta no encontrada con ID: " + accountId));
        
        if (!account.getAccountNumber().equals(accountInput.getAccountNumber()) && 
            accountRepository.existsByAccountNumber(accountInput.getAccountNumber())) {
            throw new DuplicateAccountNumberException("Ya existe una cuenta con el número: " + accountInput.getAccountNumber());
        }

        accountMapper.updateEntity(account, accountInput);
        return accountMapper.toOutput(accountRepository.save(account));
    }

    @Override
    public AccountOutput patchAccount(UUID accountId, AccountPatchInput accountPatch) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Cuenta no encontrada con ID: " + accountId));

        if (accountPatch.getAccountNumber() != null && 
            !account.getAccountNumber().equals(accountPatch.getAccountNumber()) && 
            accountRepository.existsByAccountNumber(accountPatch.getAccountNumber())) {
            throw new DuplicateAccountNumberException("Ya existe una cuenta con el número: " + accountPatch.getAccountNumber());
        }

        accountMapper.updateEntityFromPatch(account, accountPatch);
        return accountMapper.toOutput(accountRepository.save(account));
    }

    @Override
    public void deleteAccount(UUID accountId) {
        if (!accountRepository.existsById(accountId)) {
            throw new AccountNotFoundException("Cuenta no encontrada con ID: " + accountId);
        }
        accountRepository.deleteById(accountId);
    }
}