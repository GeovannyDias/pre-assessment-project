package com.company.asm.customer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateIdentificationException extends RuntimeException {
    public DuplicateIdentificationException(String message) {
        super(message);
    }
}