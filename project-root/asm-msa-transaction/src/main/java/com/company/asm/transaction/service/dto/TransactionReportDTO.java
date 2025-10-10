package com.company.asm.transaction.service.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionReportDTO {
    private String customerName;
    private String accountNumber;
    private String accountType;
    private String accountStatus;
    private List<TransactionDto> transactions;
}
