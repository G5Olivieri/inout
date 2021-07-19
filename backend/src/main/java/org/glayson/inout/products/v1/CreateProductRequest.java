package org.glayson.inout.products.v1;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class CreateProductRequest {
    @NotBlank(message = "Name must be not blank")
    private String name;

    @Min(message = "Price must be greater than 0", value = 1)
    private long price;
    @Min(message = "Quantity must be greater than 0", value = 1)
    private int quantity;

    public CreateProductRequest() {
    }

    public CreateProductRequest(String name, long price, int quantity) {
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

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
