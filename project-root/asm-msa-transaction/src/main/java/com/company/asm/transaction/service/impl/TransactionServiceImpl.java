package com.company.asm.transaction.service.impl;

import com.company.asm.transaction.api.model.TransactionInput;
import com.company.asm.transaction.api.model.TransactionOutput;
import com.company.asm.transaction.domain.Transaction;
import com.company.asm.transaction.exception.InvalidTransactionException;
import com.company.asm.transaction.exception.TransactionNotFoundException;
import com.company.asm.transaction.repository.TransactionRepository;
import com.company.asm.transaction.service.TransactionService;
import com.company.asm.transaction.service.mapper.TransactionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    @Override
    public TransactionOutput createTransaction(TransactionInput transactionInput) {
        validateTransactionInput(transactionInput);

        Transaction transaction = transactionMapper.toEntity(transactionInput);
        transaction = transactionRepository.save(transaction);
        
        return transactionMapper.toOutput(transaction);
    }

    @Override
    public TransactionOutput getTransactionById(UUID transactionId) {
        return transactionRepository.findById(transactionId)
                .map(transactionMapper::toOutput)
                .orElseThrow(() -> new TransactionNotFoundException(
                    "Transacción no encontrada con ID: " + transactionId));
    }

    @Override
    public List<TransactionOutput> getTransactionsByFilter(UUID accountId, LocalDate startDate, LocalDate endDate) {
        OffsetDateTime startDateTime = startDate != null 
            ? startDate.atStartOfDay().atOffset(ZoneOffset.UTC)
            : null;
        OffsetDateTime endDateTime = endDate != null 
            ? endDate.atTime(LocalTime.MAX).atOffset(ZoneOffset.UTC)
            : null;

        List<Transaction> transactions;
        if (accountId != null) {
            if (startDateTime != null && endDateTime != null) {
                transactions = transactionRepository.findByAccountIdAndCreatedAtBetween(
                    accountId, startDateTime, endDateTime);
            } else {
                transactions = transactionRepository.findByAccountId(accountId);
            }
        } else if (startDateTime != null && endDateTime != null) {
            transactions = transactionRepository.findByCreatedAtBetween(startDateTime, endDateTime);
        } else {
            transactions = transactionRepository.findAll();
        }

        return transactionMapper.toDtoList(transactions);
    }

    private void validateTransactionInput(TransactionInput transactionInput) {
        if (transactionInput.getAmount() == null || 
            transactionInput.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidTransactionException("El monto debe ser mayor que cero");
        }

        if (transactionInput.getAccountId() == null) {
            throw new InvalidTransactionException("El ID de la cuenta es requerido");
        }

        if (transactionInput.getType() == null) {
            throw new InvalidTransactionException("El tipo de transacción es requerido");
        }

        if (transactionInput.getDescription() != null && 
            transactionInput.getDescription().length() > 150) {
            throw new InvalidTransactionException(
                "La descripción no puede exceder los 150 caracteres");
        }
    }

    @Override
    public List<TransactionOutput> getAllTransactions() {
        return transactionMapper.toDtoList(transactionRepository.findAll());
    }
}