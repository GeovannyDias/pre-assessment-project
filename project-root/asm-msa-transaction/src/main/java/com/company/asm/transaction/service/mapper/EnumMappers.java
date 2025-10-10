package com.company.asm.transaction.service.mapper;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import com.company.asm.transaction.api.model.AccountSummary;
import com.company.asm.transaction.api.model.TransactionOutput;
import com.company.asm.transaction.domain.enums.AccountType;

@Component
public class EnumMappers {
    @Named("toAccountType")
    public AccountType toAccountType(AccountSummary.AccountTypeEnum accountType) {
        return accountType != null ? AccountType.valueOf(accountType.toString()) : null;
    }

    @Named("toAccountType")
    public AccountType toAccountType(String accountType) {
        return accountType != null ? AccountType.valueOf(accountType) : null;
    }

    @Named("fromAccountType")
    public AccountSummary.AccountTypeEnum fromAccountType(AccountType accountType) {
        return accountType != null ? AccountSummary.AccountTypeEnum.fromValue(accountType.toString()) : null;
    }

    public TransactionOutput.TypeEnum typeEnumToTypeEnum(TransactionOutput.TypeEnum type) {
        return type;
    }
}
