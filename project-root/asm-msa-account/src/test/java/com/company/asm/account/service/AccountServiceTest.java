package com.company.asm.account.service;

import com.company.asm.account.service.mapper.AccountMapper;
import com.company.asm.account.api.model.AccountInput;
import com.company.asm.account.api.model.AccountOutput;
import com.company.asm.account.domain.Account;
import com.company.asm.account.domain.enums.AccountType;
import com.company.asm.account.exception.AccountNotFoundException;
import com.company.asm.account.exception.DuplicateAccountNumberException;
import com.company.asm.account.repository.AccountRepository;
import com.company.asm.account.service.impl.AccountServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private AccountMapper accountMapper;

    @InjectMocks
    private AccountServiceImpl accountService;

    private AccountInput accountInput;
    private AccountOutput accountOutput;
    private Account account;
    private UUID accountId;
    private UUID customerId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        accountId = UUID.randomUUID();
        customerId = UUID.randomUUID();

        accountInput = new AccountInput();
        accountInput.setAccountNumber("123456789");
        accountInput.setAccountType(AccountInput.AccountTypeEnum.AHORRO);
        accountInput.setBalance(BigDecimal.valueOf(1000.0));
        accountInput.setStatus(AccountInput.StatusEnum.NUMBER_1);
        accountInput.setCustomerId(customerId);

        account = new Account();
        account.setIdAccount(accountId);
        account.setAccountNumber("123456789");
        account.setAccountType(AccountType.AHORRO);
        account.setBalance(BigDecimal.valueOf(1000.0));
        account.setStatus(true);
        account.setCustomerId(customerId);
        account.setCreatedAt(OffsetDateTime.now());
        account.setUpdatedAt(OffsetDateTime.now());

        accountOutput = new AccountOutput();
        accountOutput.setIdAccount(accountId);
        accountOutput.setAccountNumber("123456789");
        accountOutput.setAccountType(AccountOutput.AccountTypeEnum.AHORRO);
        accountOutput.setBalance(BigDecimal.valueOf(1000.0));
        accountOutput.setStatus(AccountOutput.StatusEnum.NUMBER_1);
        accountOutput.setCustomerId(customerId);
        accountOutput.setCreatedAt(OffsetDateTime.now());
        accountOutput.setUpdatedAt(OffsetDateTime.now());
     
    }

    @Test
    void getAllAccounts_ShouldReturnAllAccounts() {
        List<Account> accounts = Arrays.asList(account);
        List<AccountOutput> expectedOutputs = Arrays.asList(accountOutput);
        when(accountRepository.findAll()).thenReturn(accounts);
        when(accountMapper.toDtoList(accounts)).thenReturn(expectedOutputs);

        List<AccountOutput> result = accountService.getAllAccounts();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(accountRepository).findAll();
        verify(accountMapper).toDtoList(accounts);
    }

    @Test
    void getAccountById_WhenAccountExists_ShouldReturnAccount() {
        when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(accountMapper.toOutput(account)).thenReturn(accountOutput);

        AccountOutput result = accountService.getAccountById(accountId);

        assertNotNull(result);
        assertEquals(accountId, result.getIdAccount());
        verify(accountRepository).findById(accountId);
    }

    @Test
    void getAccountById_WhenAccountDoesNotExist_ShouldThrowException() {
        when(accountRepository.findById(accountId)).thenReturn(Optional.empty());

        assertThrows(AccountNotFoundException.class, () -> 
            accountService.getAccountById(accountId)
        );
        verify(accountRepository).findById(accountId);
    }

    @Test
    void createAccount_WhenAccountNumberDoesNotExist_ShouldCreateAccount() {
        when(accountRepository.existsByAccountNumber(anyString())).thenReturn(false);
        when(accountMapper.toEntity(any(AccountInput.class))).thenReturn(account);
        when(accountRepository.save(any(Account.class))).thenReturn(account);
        when(accountMapper.toOutput(account)).thenReturn(accountOutput);

        AccountOutput result = accountService.createAccount(accountInput);

        assertNotNull(result);
        verify(accountRepository).save(any(Account.class));
    }

    @Test
    void createAccount_WhenAccountNumberExists_ShouldThrowException() {
        when(accountRepository.existsByAccountNumber(anyString())).thenReturn(true);

        assertThrows(DuplicateAccountNumberException.class, () ->
            accountService.createAccount(accountInput)
        );
        verify(accountRepository, never()).save(any(Account.class));
    }
}