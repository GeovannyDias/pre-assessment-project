package com.company.asm.customer.service.mapper;

import com.company.asm.customer.api.model.CustomerInput;
import com.company.asm.customer.api.model.CustomerOutput;
import com.company.asm.customer.api.model.CustomerPatchInput;
import com.company.asm.customer.domain.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface CustomerMapper {
    
    @Mapping(target = "idCustomer", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Customer toEntity(CustomerInput customerInput);
    
    CustomerOutput toOutput(Customer customer);
    
    @Mapping(target = "idCustomer", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(@MappingTarget Customer target, CustomerInput source);

    @Mapping(target = "idCustomer", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void patchEntity(@MappingTarget Customer target, CustomerPatchInput source);
}