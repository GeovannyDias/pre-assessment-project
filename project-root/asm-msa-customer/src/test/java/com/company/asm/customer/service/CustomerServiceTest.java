package com.company.asm.customer.service;

import com.company.asm.customer.api.model.CustomerInput;
import com.company.asm.customer.api.model.CustomerOutput;
import com.company.asm.customer.domain.Customer;
import com.company.asm.customer.exception.CustomerNotFoundException;
import com.company.asm.customer.repository.CustomerRepository;
import com.company.asm.customer.service.impl.CustomerServiceImpl;
import com.company.asm.customer.service.mapper.CustomerMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerMapper customerMapper;

    @InjectMocks
    private CustomerServiceImpl customerService;

    private CustomerInput customerInput;
    private CustomerOutput customerOutput;
    private Customer customer;
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

        customer = new Customer();
        customer.setIdCustomer(customerId);
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setIdentification("1234567890");
        customer.setPhone("1234567890");
        customer.setAddress("123 Test St");
        customer.setCreatedAt(OffsetDateTime.now());
        customer.setUpdatedAt(OffsetDateTime.now());

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
    void createCustomer_ShouldReturnCustomerOutput() {
        when(customerMapper.toEntity(any(CustomerInput.class))).thenReturn(customer);
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);
        when(customerMapper.toOutput(any(Customer.class))).thenReturn(customerOutput);

        CustomerOutput result = customerService.createCustomer(customerInput);

        assertNotNull(result);
        assertEquals(customerOutput.getFirstName(), result.getFirstName());
        assertEquals(customerOutput.getLastName(), result.getLastName());
        assertEquals(customerOutput.getIdCustomer(), result.getIdCustomer());
        verify(customerRepository).save(any(Customer.class));
    }

    @Test
    void getCustomerById_ShouldReturnCustomerOutput() {
        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(customerMapper.toOutput(customer)).thenReturn(customerOutput);

        CustomerOutput result = customerService.getCustomerById(customerId);

        assertNotNull(result);
        assertEquals(customerOutput.getFirstName(), result.getFirstName());
        assertEquals(customerOutput.getLastName(), result.getLastName());
        assertEquals(customerOutput.getIdCustomer(), result.getIdCustomer());
    }

    @Test
    void getCustomerById_WhenNotFound_ShouldThrowException() {
        when(customerRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        assertThrows(CustomerNotFoundException.class, () -> customerService.getCustomerById(customerId));
    }
    
    @Test
    void getAllCustomers_ShouldReturnList() {
        List<Customer> customers = Arrays.asList(customer);
        when(customerRepository.findAll()).thenReturn(customers);
        when(customerMapper.toOutput(any(Customer.class))).thenReturn(customerOutput);

        List<CustomerOutput> result = customerService.getAllCustomers();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals(customerOutput.getIdCustomer(), result.get(0).getIdCustomer());
    }

    @Test
    void updateCustomer_ShouldReturnUpdatedCustomerOutput() {
        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);
        when(customerMapper.toOutput(any(Customer.class))).thenReturn(customerOutput);

        CustomerOutput result = customerService.updateCustomer(customerId, customerInput);

        assertNotNull(result);
        assertEquals(customerOutput.getFirstName(), result.getFirstName());
        assertEquals(customerOutput.getLastName(), result.getLastName());
        assertEquals(customerOutput.getIdCustomer(), result.getIdCustomer());
        verify(customerMapper).updateEntity(any(Customer.class), any(CustomerInput.class));
    }

    @Test
    void updateCustomer_WhenNotFound_ShouldThrowException() {
        when(customerRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        assertThrows(CustomerNotFoundException.class, () -> customerService.updateCustomer(customerId, customerInput));
    }

    @Test
    void deleteCustomer_ShouldDeleteSuccessfully() {
        when(customerRepository.findById(customerId)).thenReturn(Optional.of(customer));

        assertDoesNotThrow(() -> customerService.deleteCustomer(customerId));
        verify(customerRepository).delete(customer);
    }

    @Test
    void deleteCustomer_WhenNotFound_ShouldThrowException() {
        when(customerRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        assertThrows(CustomerNotFoundException.class, () -> customerService.deleteCustomer(customerId));
    }
}