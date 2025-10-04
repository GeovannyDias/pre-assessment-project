package com.company.asm.account.exception;

import com.company.asm.account.service.dto.MessageResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<MessageResponseDto> handleAccountNotFound(AccountNotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(MessageResponseDto.builder().message(e.getMessage()).build());
    }

    @ExceptionHandler(DuplicateAccountNumberException.class)
    public ResponseEntity<MessageResponseDto> handleDuplicateAccountNumber(DuplicateAccountNumberException e) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(MessageResponseDto.builder().message(e.getMessage()).build());
    }
}