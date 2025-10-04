package com.company.asm.account.service.mapper;

import com.company.asm.account.api.model.AccountInput;
import com.company.asm.account.api.model.AccountOutput;
import com.company.asm.account.domain.enums.AccountType;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

@Component
public class EnumMappers {

    @Named("toAccountType")
    public AccountType toAccountType(AccountInput.AccountTypeEnum accountType) {
        return accountType != null ? AccountType.valueOf(accountType.toString()) : null;
    }

    @Named("toAccountType")
    public AccountType toAccountType(String accountType) {
        return accountType != null ? AccountType.valueOf(accountType) : null;
    }

    @Named("fromAccountType")
    public AccountOutput.AccountTypeEnum fromAccountType(AccountType accountType) {
        return accountType != null ? AccountOutput.AccountTypeEnum.fromValue(accountType.toString()) : null;
    }
}