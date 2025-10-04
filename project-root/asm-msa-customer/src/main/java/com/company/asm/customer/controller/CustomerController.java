package com.company.asm.customer.controller;

import com.company.asm.customer.api.controller.*;
import com.company.asm.customer.api.model.*;
import com.company.asm.customer.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class CustomerController implements CreateCustomerApi, ListCustomersApi, GetCustomerByCustomerIdApi, UpdateCustomerByCustomerIdApi, DeleteCustomerByCustomerIdApi, PartialUpdateCustomerByCustomerIdApi {

    private final CustomerService customerService;

    @Override
    public ResponseEntity<CustomerOutput> postCustomerCreateRequest(@Valid CustomerInput customerInput) {
        return ResponseEntity.status(201).body(customerService.createCustomer(customerInput));
    }

    @Override
    public ResponseEntity<List<CustomerOutput>> getCustomersListResponse() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @Override
    public ResponseEntity<CustomerOutput> getCustomerByCustomerIdResponse(UUID customerId) {
        return ResponseEntity.ok(customerService.getCustomerById(customerId));
    }

    @Override
    public ResponseEntity<CustomerOutput> putCustomerUpdateByCustomerIdRequest(UUID customerId, @Valid CustomerInput customerInput) {
        return ResponseEntity.ok(customerService.updateCustomer(customerId, customerInput));
    }

    @Override
    public ResponseEntity<CustomerOutput> patchCustomerUpdateByCustomerIdRequest(UUID customerId, @Valid CustomerPatchInput customerPatchInput) {
        return ResponseEntity.ok(customerService.patchCustomer(customerId, customerPatchInput));
    }

    @Override
    public ResponseEntity<DeleteCustomerByCustomerIdRequest200Response> deleteCustomerByCustomerIdRequest(UUID customerId) {
        customerService.deleteCustomer(customerId);
        DeleteCustomerByCustomerIdRequest200Response response = new DeleteCustomerByCustomerIdRequest200Response();
        response.setMessage("El cliente fue eliminado correctamente.");
        return ResponseEntity.ok(response);
    }
}