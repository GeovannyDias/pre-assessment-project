package com.company.asm.identity.exception;

import com.company.asm.identity.api.model.MessageResponse;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<MessageResponse> handleUserNotFound(UserNotFoundException e) {
        MessageResponse response = new MessageResponse();
        response.setMessage(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(InvalidUserException.class)
    public ResponseEntity<MessageResponse> handleInvalidUser(InvalidUserException e) {
        MessageResponse response = new MessageResponse();
        response.setMessage(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MessageResponse> handleValidationExceptions(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));
        
        MessageResponse response = new MessageResponse();
        response.setMessage("Error de validación: " + message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<MessageResponse> handleDataIntegrityViolation(DataIntegrityViolationException e) {
        MessageResponse response = new MessageResponse();
        if (e.getMessage() != null && e.getMessage().contains("UK_BEC_USER_USERNAME")) {
            response.setMessage("El nombre de usuario ya está en uso");
        } else {
            response.setMessage("Error de integridad de datos");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(DataAccessResourceFailureException.class)
    public ResponseEntity<MessageResponse> handleDataAccessResourceFailure(DataAccessResourceFailureException e) {
        MessageResponse response = new MessageResponse();
        response.setMessage("Error al acceder a la base de datos");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageResponse> handleGenericException(Exception e) {
        MessageResponse response = new MessageResponse();
        response.setMessage("Error interno del servidor");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}