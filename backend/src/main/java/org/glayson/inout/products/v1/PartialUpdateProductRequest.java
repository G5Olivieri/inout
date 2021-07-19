package org.glayson.inout.products.v1;

public class PartialUpdateProductRequest {
    private String name;
    private Long price;
    private Integer quantity;

    public PartialUpdateProductRequest() {
    }

    public PartialUpdateProductRequest(String name, Long price, Integer quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}