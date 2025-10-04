package com.company.asm.account.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

import java.time.OffsetDateTime;
import java.util.UUID;

import com.company.asm.account.domain.converter.UUIDToStringConverter;
import com.company.asm.account.domain.enums.AccountType;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BEC_ACCOUNT")
public class Account {
    @Id
    @Column(name = "ID_ACCOUNT", columnDefinition = "CHAR(36)")
    @Convert(converter = UUIDToStringConverter.class)
    private UUID idAccount;

    @Column(name = "ACCOUNT_NUMBER", length = 32, nullable = false, unique = true)
    private String accountNumber;

    @Column(name = "ACCOUNT_TYPE", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @Column(name = "BALANCE", nullable = false, precision = 18, scale = 2)
    private BigDecimal balance;

    @Column(name = "STATUS", nullable = false)
    private Boolean status;

    @Column(name = "CUSTOMER_ID", columnDefinition = "CHAR(36)", nullable = false)
    @Convert(converter = UUIDToStringConverter.class)
    private UUID customerId;

    @Column(name = "CREATED_AT", nullable = false, updatable = false, insertable = false)
    private OffsetDateTime createdAt;

    @Column(name = "UPDATED_AT", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (idAccount == null) {
            idAccount = UUID.randomUUID();
        }
        if (balance == null) {
            balance = BigDecimal.ZERO;
        }
        if (status == null) {
            status = true;
        }
    }
}