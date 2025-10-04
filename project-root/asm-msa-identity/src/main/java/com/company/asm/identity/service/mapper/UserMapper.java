package com.company.asm.identity.service.mapper;

import com.company.asm.identity.api.model.UserInput;
import com.company.asm.identity.api.model.UserOutput;
import com.company.asm.identity.api.model.UserPatchInput;
import com.company.asm.identity.domain.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {

    @Mapping(target = "idUser", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User toEntity(UserInput userInput);

    UserOutput toOutput(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromPatchInput(UserPatchInput userPatchInput, @MappingTarget User user);
}