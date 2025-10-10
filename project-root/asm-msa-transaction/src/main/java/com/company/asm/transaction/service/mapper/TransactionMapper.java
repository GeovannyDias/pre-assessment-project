package com.company.asm.transaction.service.mapper;

import com.company.asm.transaction.api.model.AccountSummary;
import com.company.asm.transaction.api.model.TransactionInput;
import com.company.asm.transaction.api.model.TransactionOutput;
import com.company.asm.transaction.domain.Account;
import com.company.asm.transaction.domain.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = EnumMappers.class
    )
public interface TransactionMapper {
    @Mapping(target = "idTransaction", ignore = true)
    @Mapping(target = "balanceBefore", ignore = true)
    @Mapping(target = "balanceAfter", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(source = "type", target = "type")
    Transaction toEntity(TransactionInput input);

    @Mapping(source = "transaction.account", target = "account")
    TransactionOutput toOutput(Transaction transaction);

    List<TransactionOutput> toDtoList(List<Transaction> transactions);

    @Mapping(target = "accountType", qualifiedByName = "fromAccountType")
    @Mapping(target = "status", expression = "java(Boolean.TRUE.equals(account.getStatus()) ? AccountSummary.StatusEnum.NUMBER_1 : AccountSummary.StatusEnum.NUMBER_0)")
    AccountSummary toAccountSummary(Account account);
}