package com.company.asm.customer.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.company.asm.customer.domain.converter.UUIDToStringConverter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BEC_CUSTOMER")
public class Customer {
    
    @Id
    @Column(name = "ID_CUSTOMER", columnDefinition = "CHAR(36)")
    @Convert(converter = UUIDToStringConverter.class)
    private UUID idCustomer;
    
    @Column(name = "FIRST_NAME", length = 50, nullable = false)
    private String firstName;
    
    @Column(name = "LAST_NAME", length = 50, nullable = false)
    private String lastName;
    
    @Column(name = "IDENTIFICATION", length = 13, nullable = false, unique = true)
    private String identification;
    
    @Column(name = "ADDRESS", length = 255)
    private String address;
    
    @Column(name = "PHONE", length = 10)
    private String phone;
    
    @Column(name = "CREATED_AT", nullable = false, updatable = false, insertable = false)
    private OffsetDateTime createdAt;
    
    @Column(name = "UPDATED_AT", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        if (idCustomer == null) {
            idCustomer = UUID.randomUUID();
        }
    }
}