package com.company.asm.transaction.exception;

import com.company.asm.transaction.service.dto.MessageResponseDto;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TransactionNotFoundException.class)
    public ResponseEntity<MessageResponseDto> handleTransactionNotFound(TransactionNotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(MessageResponseDto.builder().message(e.getMessage()).build());
    }

    @ExceptionHandler(InvalidTransactionException.class)
    public ResponseEntity<MessageResponseDto> handleInvalidTransaction(InvalidTransactionException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(MessageResponseDto.builder().message(e.getMessage()).build());
    }

    @ExceptionHandler(DataAccessResourceFailureException.class)
    public ResponseEntity<MessageResponseDto> handleDataAccessResourceFailure(DataAccessResourceFailureException e) {
        // Extraer el mensaje específico del trigger
        String message = null;
        Throwable rootCause = e.getRootCause();
        if (rootCause != null && rootCause.getMessage() != null) {
            message = rootCause.getMessage();
        } else if (e.getMessage() != null) {
            message = e.getMessage();
        }
        
        // Si el mensaje contiene la cadena específica del trigger
        if (message != null && message.contains("Fondos insuficientes")) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(MessageResponseDto.builder()
                            .message("Fondos insuficientes para realizar la transacción")
                            .build());
        }

        // Para otros errores de acceso a datos
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(MessageResponseDto.builder()
                        .message("Error al procesar la transacción")
                        .build());
    }
}