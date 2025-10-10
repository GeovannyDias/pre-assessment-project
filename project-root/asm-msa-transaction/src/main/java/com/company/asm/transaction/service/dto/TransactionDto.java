package com.company.asm.transaction.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {
    private String date;
    private String balanceBefore;
    private String accountStatus;
    private String amount;
    private String balanceAfter;
}
