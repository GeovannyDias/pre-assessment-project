package com.company.asm.account.service.mapper;

import com.company.asm.account.api.model.AccountInput;
import com.company.asm.account.api.model.AccountOutput;
import com.company.asm.account.api.model.AccountPatchInput;
import com.company.asm.account.api.model.CustomerSummary;
import com.company.asm.account.domain.Account;
import com.company.asm.account.domain.Customer;

import org.mapstruct.*;

import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = EnumMappers.class, 
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
    )
public interface AccountMapper {
    
    @Mapping(target = "idAccount", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", expression = "java(accountInput.getStatus() != null && AccountInput.StatusEnum.NUMBER_1.equals(accountInput.getStatus()))")
    Account toEntity(AccountInput accountInput);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "accountType", qualifiedByName = "toAccountType")
    @Mapping(target = "status", expression = "java(source.getStatus() == null ? account.getStatus() : AccountPatchInput.StatusEnum.NUMBER_1.equals(source.getStatus()))")
    void updateEntityFromPatch(@MappingTarget Account account, AccountPatchInput source);

    @Mapping(target = "accountType", qualifiedByName = "fromAccountType")
    @Mapping(target = "status", expression = "java(Boolean.TRUE.equals(account.getStatus()) ? AccountOutput.StatusEnum.NUMBER_1 : AccountOutput.StatusEnum.NUMBER_0)")
    @Mapping(source = "account.customer", target = "customer")
    AccountOutput toOutput(Account account);

    List<AccountOutput> toDtoList(List<Account> accounts);

    @Mapping(target = "idAccount", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", expression = "java(source.getStatus() == null ? target.getStatus() : AccountPatchInput.StatusEnum.NUMBER_1.equals(source.getStatus()))")
    void patchEntity(@MappingTarget Account target, AccountPatchInput source);

    @Mapping(target = "idAccount", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", expression = "java(source.getStatus() != null && AccountInput.StatusEnum.NUMBER_1.equals(source.getStatus()))")
    void updateEntity(@MappingTarget Account target, AccountInput source);

    CustomerSummary toCustomerSummary(Customer customer);
}