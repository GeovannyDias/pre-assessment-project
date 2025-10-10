package com.company.asm.transaction.controller;

import com.company.asm.transaction.api.controller.CreateTransactionApi;
import com.company.asm.transaction.api.controller.GetTransactionByTransactionIdApi;
import com.company.asm.transaction.api.controller.ListTransactionsApi;
import com.company.asm.transaction.api.model.TransactionInput;
import com.company.asm.transaction.api.model.TransactionOutput;
import com.company.asm.transaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class TransactionController implements CreateTransactionApi, GetTransactionByTransactionIdApi, ListTransactionsApi {

    private final TransactionService transactionService;

    @Override
    public ResponseEntity<TransactionOutput> postTransactionCreateRequest(TransactionInput transactionInput) {
        return ResponseEntity.ok(transactionService.createTransaction(transactionInput));
    }

    @Override
    public ResponseEntity<TransactionOutput> getTransactionByTransactionIdResponse(UUID transactionId) {
        return ResponseEntity.ok(transactionService.getTransactionById(transactionId));
    }

    @Override
    public ResponseEntity<List<TransactionOutput>> getTransactionsListByAccoundIdAndDateResponse(UUID accountId, LocalDate startDate, LocalDate endDate) {
        return ResponseEntity.ok(transactionService.getTransactionsByFilter(accountId, startDate, endDate));
    }

    @Override
    public ResponseEntity<List<TransactionOutput>> getTransactionsListResponse() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }
}