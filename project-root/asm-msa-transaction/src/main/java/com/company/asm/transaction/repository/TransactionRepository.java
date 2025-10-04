package com.company.asm.transaction.repository;

import com.company.asm.transaction.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByAccountId(UUID accountId);
    List<Transaction> findByCreatedAtBetween(OffsetDateTime startDate, OffsetDateTime endDate);
    List<Transaction> findByAccountIdAndCreatedAtBetween(UUID accountId, OffsetDateTime startDate, OffsetDateTime endDate);
}