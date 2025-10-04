package com.company.asm.customer.service;

import com.company.asm.customer.api.model.CustomerInput;
import com.company.asm.customer.api.model.CustomerOutput;
import com.company.asm.customer.api.model.CustomerPatchInput;

import java.util.List;
import java.util.UUID;

public interface CustomerService {
    CustomerOutput createCustomer(CustomerInput customerInput);
    CustomerOutput getCustomerById(UUID customerId);
    List<CustomerOutput> getAllCustomers();
    CustomerOutput updateCustomer(UUID customerId, CustomerInput customerInput);
    CustomerOutput patchCustomer(UUID customerId, CustomerPatchInput customerPatchInput);
    void deleteCustomer(UUID customerId);
}