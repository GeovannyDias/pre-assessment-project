package com.company.asm.transaction.service;

import com.company.asm.transaction.api.model.TransactionInput;
import com.company.asm.transaction.api.model.TransactionOutput;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TransactionService {
    TransactionOutput createTransaction(TransactionInput transactionInput);
    TransactionOutput getTransactionById(UUID transactionId);
    List<TransactionOutput> getTransactionsByFilter(UUID accountId, LocalDate startDate, LocalDate endDate);
    List<TransactionOutput> getAllTransactions();
}