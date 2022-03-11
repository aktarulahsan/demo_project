package com.aktar.demo.SalesInvoiceDetails;

import com.aktar.demo.SalesInvoice.SalesInvoiceRepository;
import com.aktar.demo.utill.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalesInvoiceDetailsService {

    @Autowired
    private SalesInvoiceDetailsRepository repository;

    public Response list(String reqObj) {
        return repository.list(reqObj);
    }

    public Response save(String reqObj) {
        return repository.save(reqObj);
    }

    public Response update(String reqObj ) {
        return repository.update(reqObj);
    }

    public Response delete(Long id) {
        return repository.delete(id);
    }
    public Response deleteByInvoiceId(Long id) {
        return repository.deleteByInvoiceId(id);
    }
}
