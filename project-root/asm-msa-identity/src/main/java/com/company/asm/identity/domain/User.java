package com.company.asm.identity.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.company.asm.identity.domain.converter.UUIDToStringConverter;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BEC_USER")
public class User {

    @Id
    @Column(name = "ID_USER", columnDefinition = "CHAR(36)")
    @Convert(converter = UUIDToStringConverter.class)
    private UUID idUser;

    @Column(name = "USERNAME", nullable = false, length = 20, unique = true)
    private String username;

    @Column(name = "PASSWORD_HASH", nullable = false, length = 50)
    private String passwordHash;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ROLES", columnDefinition = "json")
    private List<String> roles;

    @Column(name = "CUSTOMER_ID", columnDefinition = "CHAR(36)")
    @Convert(converter = UUIDToStringConverter.class)
    private UUID customerId;

    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "UPDATED_AT", nullable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (idUser == null) {
            idUser = UUID.randomUUID();
        }
    }
}