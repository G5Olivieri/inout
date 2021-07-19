package org.glayson.inout.products.v1;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Product {
   @Id
   @GeneratedValue
   private long id;

   private String name;
   private long price;
   private int quantity;

   public Product(long id, String name, long price, int quantity) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
   }

   public Product(String name, long price, int quantity) {
      this.name = name;
      this.price = price;
      this.quantity = quantity;
   }

   public Product() {

   }

   public long getId() {
      return id;
   }

   public void setId(long id) {
      this.id = id;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public int getQuantity() {
      return quantity;
   }

   public void setQuantity(int quantity) {
      this.quantity = quantity;
   }

   public long getPrice() {
      return price;
   }

   public void setPrice(long price) {
      this.price = price;
   }

   @Override
   public String toString() {
      return "Product{" +
              "id=" + id +
              ", name='" + name + '\'' +
              ", quantity=" + quantity +
              ", price='" + price + '\'' +
              '}';
   }
}
