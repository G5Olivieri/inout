package org.glayson.inout.v1.purchases;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

public class CreatePurchase {
    public static class CreateSaleProduct {
        @NotBlank
        private Long id;
        @Min(0)
        private Long price;
        @Min(0)
        private Long quantity;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
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

        @Override
        public String toString() {
            return "CreateSaleProduct{" +
                    "id=" + id +
                    ", price=" + price +
                    ", quantity=" + quantity +
                    '}';
        }
    }
    private Date date;
    private List<CreateSaleProduct> products;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<CreateSaleProduct> getProducts() {
        return products;
    }

    public void setProducts(List<CreateSaleProduct> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "CreateSale{" +
                "date=" + ZonedDateTime.ofInstant(date.toInstant(), ZoneOffset.UTC).format(DateTimeFormatter.ISO_DATE_TIME) +
                ", products=" + products +
                '}';
    }
}
