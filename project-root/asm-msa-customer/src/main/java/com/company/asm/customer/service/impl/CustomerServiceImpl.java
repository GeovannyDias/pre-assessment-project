package com.company.asm.customer.service.impl;

import com.company.asm.customer.api.model.CustomerInput;
import com.company.asm.customer.api.model.CustomerOutput;
import com.company.asm.customer.api.model.CustomerPatchInput;
import com.company.asm.customer.domain.Customer;
import com.company.asm.customer.exception.CustomerNotFoundException;
import com.company.asm.customer.exception.DuplicateIdentificationException;
import com.company.asm.customer.repository.CustomerRepository;
import com.company.asm.customer.service.CustomerService;
import com.company.asm.customer.service.mapper.CustomerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.company.asm.customer.util.ErrorMessages;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    @Transactional
    public CustomerOutput createCustomer(CustomerInput customerInput) {
        if (customerRepository.existsByIdentification(customerInput.getIdentification())) {
            throw new DuplicateIdentificationException(ErrorMessages.DUPLICATE_IDENTIFICATION);
        }
        Customer customer = customerMapper.toEntity(customerInput);
        customer = customerRepository.save(customer);
        return customerMapper.toOutput(customer);
    }

    @Override
    public CustomerOutput getCustomerById(UUID customerId) {
        return customerRepository.findById(customerId)
                .map(customerMapper::toOutput)
                .orElseThrow(() -> new CustomerNotFoundException(String.format(ErrorMessages.CUSTOMER_NOT_FOUND, customerId)));
    }

    @Override
    public List<CustomerOutput> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(customerMapper::toOutput)
                .toList();
    }

    @Override
    @Transactional
    public CustomerOutput updateCustomer(UUID customerId, CustomerInput customerInput) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException(String.format(ErrorMessages.CUSTOMER_NOT_FOUND, customerId)));
                
        customerMapper.updateEntity(customer, customerInput);
        customer = customerRepository.save(customer);
        
        return customerMapper.toOutput(customer);
    }

    @Override
    @Transactional
    public CustomerOutput patchCustomer(UUID customerId, CustomerPatchInput customerPatchInput) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException(String.format(ErrorMessages.CUSTOMER_NOT_FOUND, customerId)));

        customerMapper.patchEntity(customer, customerPatchInput);
        customer = customerRepository.save(customer);
        
        return customerMapper.toOutput(customer);
    }

    @Override
    @Transactional
    public void deleteCustomer(UUID customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException(String.format(ErrorMessages.CUSTOMER_NOT_FOUND, customerId)));
        customerRepository.delete(customer);
    }
}