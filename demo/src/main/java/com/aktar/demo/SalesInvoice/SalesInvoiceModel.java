package com.aktar.demo.SalesInvoice;



import com.aktar.demo.SalesInvoiceDetails.SalesInvoiceDetailsModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "salesInvoice")
public class SalesInvoiceModel {

    @Id
    @Column(nullable = false, name = "id")
    Long id;

    @Column(name = "invoiceNumber")
    String invoiceNumber;

    @Column(name = "invoiceDate")
    Date invoiceDate;
    @Column(name = "customerName")
    String customerName;
    @Column(name = "totalAmount")
    double totalAmount;
    @Transient
    private List<SalesInvoiceDetailsModel> detailsList;




}
