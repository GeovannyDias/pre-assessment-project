package com.company.asm.transaction.service.mapper;

import com.company.asm.transaction.api.model.TransactionInput;
import com.company.asm.transaction.api.model.TransactionOutput;
import com.company.asm.transaction.domain.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    @Mapping(target = "idTransaction", ignore = true)
    @Mapping(target = "balanceBefore", ignore = true)
    @Mapping(target = "balanceAfter", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(source = "type", target = "type")
    Transaction toEntity(TransactionInput input);

    default TransactionOutput.TypeEnum typeEnumToTypeEnum(TransactionOutput.TypeEnum type) {
        return type;
    }

    TransactionOutput toOutput(Transaction transaction);

    List<TransactionOutput> toDtoList(List<Transaction> transactions);
}