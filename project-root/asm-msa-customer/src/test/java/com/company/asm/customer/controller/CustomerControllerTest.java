package com.company.asm.customer.controller;

import com.company.asm.customer.api.model.*;
import com.company.asm.customer.service.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.OffsetDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerControllerTest {

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private CustomerController customerController;

    private CustomerInput customerInput;
    private CustomerOutput customerOutput;
    private UUID customerId;

    @BeforeEach
    void setUp() {
        customerId = UUID.randomUUID();
        
        customerInput = new CustomerInput();
        customerInput.setFirstName("John");
        customerInput.setLastName("Doe");
        customerInput.setIdentification("1234567890");
        customerInput.setPhone("1234567890");
        customerInput.setAddress("123 Test St");

        customerOutput = new CustomerOutput();
        customerOutput.setIdCustomer(customerId);
        customerOutput.setFirstName("John");
        customerOutput.setLastName("Doe");
        customerOutput.setIdentification("1234567890");
        customerOutput.setPhone("1234567890");
        customerOutput.setAddress("123 Test St");
        customerOutput.setCreatedAt(OffsetDateTime.now());
        customerOutput.setUpdatedAt(OffsetDateTime.now());
    }

    @Test
    void postCustomerCreateRequest_ShouldReturn201Created() {
        when(customerService.createCustomer(any(CustomerInput.class))).thenReturn(customerOutput);

        ResponseEntity<CustomerOutput> response = customerController.postCustomerCreateRequest(customerInput);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(customerOutput, response.getBody());
        verify(customerService).createCustomer(customerInput);
    }

    @Test
    void getCustomerByCustomerIdResponse_ShouldReturnCustomer() {
        when(customerService.getCustomerById(customerId)).thenReturn(customerOutput);

        ResponseEntity<CustomerOutput> response = customerController.getCustomerByCustomerIdResponse(customerId);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(customerOutput, response.getBody());
        assertEquals(customerId, response.getBody().getIdCustomer());
        verify(customerService).getCustomerById(customerId);
    }


}