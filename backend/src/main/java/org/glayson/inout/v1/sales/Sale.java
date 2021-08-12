package org.glayson.inout.v1.sales;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.annotations.Type;
import org.hibernate.type.StringNVarcharType;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
public class Sale {
    @Id
    @GeneratedValue
    private Long id;
    private Date date;

    @Column(name = "products", length = 1024)
    @Access(value=AccessType.PROPERTY)
    @JsonIgnore
    private String productsJSON;

    @Transient
    private List<SaleProduct> products;

    @Transient
    private final ObjectMapper mapper = new ObjectMapper();

    public Sale() {
    }

    public Sale(Date date, List<SaleProduct> products) {
        this(null, date, products);
    }

    public Sale(Long id, Date date, List<SaleProduct> products) {
        this.setId(id);
        this.setDate(date);
        this.setProducts(products);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<SaleProduct> getProducts() {
        return products;
    }

    public void setProducts(List<SaleProduct> products) {
        this.products = products;
        serializeProducts();
    }

    public String getProductsJSON() {
        return productsJSON;
    }

    public void setProductsJSON(String productsJSON) {
        this.productsJSON = productsJSON;
        deserializeProducts();
    }

    private void serializeProducts() {
        try {
            this.productsJSON = mapper.writeValueAsString(this.products);
        } catch (JsonProcessingException e) {
            // don't propagate this checked exception
        }
    }

    private void deserializeProducts() {
        try {
            this.products = Arrays.asList(mapper.readValue(productsJSON, SaleProduct[].class));
        } catch (JsonProcessingException e) {
            // don't propagate this checked exception
        }
    }
}
