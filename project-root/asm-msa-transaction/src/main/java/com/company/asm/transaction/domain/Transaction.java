package com.company.asm.transaction.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

import com.company.asm.transaction.domain.converter.UUIDToStringConverter;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BEC_TRANSACTION")
public class Transaction {
    @Id
    @Column(name = "ID_TRANSACTION", columnDefinition = "CHAR(36)")
    @Convert(converter = UUIDToStringConverter.class)
    private UUID idTransaction;

    @Column(name = "ACCOUNT_ID", columnDefinition = "CHAR(36)", nullable = false)
    @Convert(converter = UUIDToStringConverter.class)
    private UUID accountId;

    @Column(name = "TYPE", length = 10, nullable = false)
    @Enumerated(EnumType.STRING)
    private com.company.asm.transaction.api.model.TransactionOutput.TypeEnum type;

    @Column(name = "AMOUNT", nullable = false, precision = 18, scale = 2)
    private BigDecimal amount;

    @Column(name = "BALANCE_BEFORE", nullable = false, precision = 18, scale = 2)
    private BigDecimal balanceBefore;

    @Column(name = "BALANCE_AFTER", nullable = false, precision = 18, scale = 2)
    private BigDecimal balanceAfter;

    @Column(name = "DESCRIPTION", length = 150)
    private String description;

    @Column(name = "CREATED_AT", nullable = false, updatable = false, insertable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (idTransaction == null) {
            idTransaction = UUID.randomUUID();
        }
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", insertable = false, updatable = false)
    private Account account;

}