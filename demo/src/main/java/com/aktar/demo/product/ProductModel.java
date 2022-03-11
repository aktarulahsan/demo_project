package com.aktar.demo.product;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "product")
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, name = "id")
    Long    id;
    @Column(name = "productCode")
    String productCode;
    @Column(name = "productName")
    String productName;
    @Column(name = "sellingPrice")
    double sellingPrice;






  }
