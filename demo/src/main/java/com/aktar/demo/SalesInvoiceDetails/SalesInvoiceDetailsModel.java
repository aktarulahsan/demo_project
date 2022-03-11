package com.aktar.demo.SalesInvoiceDetails;

import com.aktar.demo.SalesInvoice.SalesInvoiceModel;
import com.aktar.demo.product.ProductModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "salesInvoiceDetails")
public class SalesInvoiceDetailsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, name = "id")
    Long id;


    @Column(name = "salesInvoiceId")
    Long invoiceNumber;

//    @ManyToOne(optional = false, cascade = {CascadeType.MERGE})
//    @JoinColumn(name = "salesInvoiceId", nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "salesInvoiceId", nullable = false)
////    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonIgnore
//    private SalesInvoiceModel salesInvoices;



    @Column(name = "lineNumber")
    int lineNumber;
    @Column(name = "productId")
    Long productId;

//    @ManyToOne(optional = false, cascade = {CascadeType.MERGE})
//    @JoinColumn(name = "productId", nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "productId", nullable = false)
////    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonIgnore
//    private ProductModel products;


    @Column(name = "productName")
    String productName;
    @Column(name = "quantity")
    double quantity;
    @Column(name = "unitPrice")
    double unitPrice;

    @Column(name = "amount")
    double amount;




}
