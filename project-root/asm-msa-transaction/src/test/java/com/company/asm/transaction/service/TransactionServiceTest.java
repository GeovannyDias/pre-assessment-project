package com.company.asm.transaction.service;

import com.company.asm.transaction.api.model.TransactionInput;
import com.company.asm.transaction.api.model.TransactionOutput;
import com.company.asm.transaction.domain.Transaction;
import com.company.asm.transaction.exception.InvalidTransactionException;
import com.company.asm.transaction.exception.TransactionNotFoundException;
import com.company.asm.transaction.repository.TransactionRepository;
import com.company.asm.transaction.service.impl.TransactionServiceImpl;
import com.company.asm.transaction.service.mapper.TransactionMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private TransactionMapper transactionMapper;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    private TransactionInput validInput;
    private Transaction mockTransaction;
    private TransactionOutput mockOutput;
    private UUID testAccountId;
    private UUID testTransactionId;

    @BeforeEach
    void setUp() {
        testAccountId = UUID.randomUUID();
        testTransactionId = UUID.randomUUID();

        validInput = new TransactionInput()
                .accountId(testAccountId)
                .amount(new BigDecimal("100.00"))
                .type(TransactionInput.TypeEnum.DEBIT)
                .description("Test transaction");

        mockTransaction = new Transaction();
        mockTransaction.setIdTransaction(testTransactionId);
        mockTransaction.setAccountId(testAccountId);
        mockTransaction.setAmount(new BigDecimal("100.00"));
        mockTransaction.setType(TransactionOutput.TypeEnum.DEBIT);
        mockTransaction.setDescription("Test transaction");
        mockTransaction.setCreatedAt(OffsetDateTime.now());

        mockOutput = new TransactionOutput()
                .idTransaction(testTransactionId)
                .accountId(testAccountId)
                .amount(new BigDecimal("100.00"))
                .type(TransactionOutput.TypeEnum.DEBIT)
                .description("Test transaction")
                .createdAt(OffsetDateTime.now());
    }

    @Test
    void createTransaction_withValidInput_shouldSucceed() {
        when(transactionMapper.toEntity(any(TransactionInput.class))).thenReturn(mockTransaction);
        when(transactionRepository.save(any(Transaction.class))).thenReturn(mockTransaction);
        when(transactionMapper.toOutput(any(Transaction.class))).thenReturn(mockOutput);

        TransactionOutput result = transactionService.createTransaction(validInput);

        assertNotNull(result);
        assertEquals(testTransactionId, result.getIdTransaction());
        assertEquals(testAccountId, result.getAccountId());
        assertEquals(new BigDecimal("100.00"), result.getAmount());
        assertEquals(TransactionOutput.TypeEnum.DEBIT, result.getType());
    }

    @Test
    void createTransaction_withInvalidAmount_shouldThrowException() {
        validInput.setAmount(BigDecimal.ZERO);

        assertThrows(InvalidTransactionException.class,
                () -> transactionService.createTransaction(validInput));
    }

    @Test
    void getTransactionById_withExistingId_shouldReturnTransaction() {
        when(transactionRepository.findById(testTransactionId)).thenReturn(Optional.of(mockTransaction));
        when(transactionMapper.toOutput(mockTransaction)).thenReturn(mockOutput);

        TransactionOutput result = transactionService.getTransactionById(testTransactionId);

        assertNotNull(result);
        assertEquals(testTransactionId, result.getIdTransaction());
    }

    @Test
    void getTransactionById_withNonExistingId_shouldThrowException() {
        when(transactionRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        assertThrows(TransactionNotFoundException.class,
                () -> transactionService.getTransactionById(UUID.randomUUID()));
    }

    @Test
    void getTransactionsByFilter_withValidDates_shouldReturnFilteredList() {
        LocalDate startDate = LocalDate.now().minusDays(7);
        LocalDate endDate = LocalDate.now();

        OffsetDateTime startDateTime = startDate.atStartOfDay().atOffset(ZoneOffset.UTC);
        OffsetDateTime endDateTime = endDate.atTime(LocalTime.MAX).atOffset(ZoneOffset.UTC);

        List<Transaction> mockTransactions = Arrays.asList(mockTransaction, mockTransaction);

        when(transactionRepository.findByAccountIdAndCreatedAtBetween(
                testAccountId, startDateTime, endDateTime))
                .thenReturn(mockTransactions);
        when(transactionMapper.toDtoList(mockTransactions))
                .thenReturn(Arrays.asList(mockOutput, mockOutput));

        List<TransactionOutput> results = transactionService.getTransactionsByFilter(
                testAccountId, startDate, endDate);

        assertNotNull(results);
        assertEquals(2, results.size());
        results.forEach(result -> {
            assertEquals(testAccountId, result.getAccountId());
            assertEquals(new BigDecimal("100.00"), result.getAmount());
        });
    }
}