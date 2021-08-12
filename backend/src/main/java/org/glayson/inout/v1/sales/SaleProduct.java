package org.glayson.inout.v1.sales;

public final class SaleProduct {
    private String name;
    private Long price;
    private Long quantity;

    public SaleProduct() {
    }

    public SaleProduct(String name, Long price, Long quantity) {
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

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
}
