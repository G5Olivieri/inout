package org.glayson.inout.v1.purchases;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
public class Purchase {
    @Id
    @GeneratedValue
    private Long id;
    private Date date;

    @Column(name = "products", length = 1024)
    @Access(value=AccessType.PROPERTY)
    @JsonIgnore
    private String productsJSON;

    @Transient
    private List<PurchaseProduct> products;

    @Transient
    private final ObjectMapper mapper = new ObjectMapper();

    public Purchase() {
    }

    public Purchase(Date date, List<PurchaseProduct> products) {
        this(null, date, products);
    }

    public Purchase(Long id, Date date, List<PurchaseProduct> products) {
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

    public List<PurchaseProduct> getProducts() {
        return products;
    }

    public void setProducts(List<PurchaseProduct> products) {
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
            this.products = Arrays.asList(mapper.readValue(productsJSON, PurchaseProduct[].class));
        } catch (JsonProcessingException e) {
            // don't propagate this checked exception
        }
    }
}
