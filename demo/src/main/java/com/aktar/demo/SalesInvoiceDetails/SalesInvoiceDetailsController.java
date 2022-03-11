package com.aktar.demo.SalesInvoiceDetails;

import com.aktar.demo.SalesInvoice.SalesInvoiceService;
import com.aktar.demo.utill.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("salesInvoiceDetails")
public class SalesInvoiceDetailsController {

    @Autowired
    SalesInvoiceDetailsService service;

    @PostMapping("/list")
    public Response getAll(@RequestBody() String reqObj) {
        return service.list(reqObj);
    }

}
