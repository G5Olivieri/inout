package org.glayson.inout.product;

import org.glayson.inout.domain.product.CreateProductCommand;
import org.glayson.inout.domain.product.Product;
import org.glayson.inout.domain.product.ProductCreatedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CreateProductController {
  private Model model;
  private final CreateProductCommand command;

  @Autowired
  public CreateProductController(CreateProductCommand command) {
    this.command = command;
  }

  @PostMapping("/products")
  public String createProduct(@ModelAttribute CreateProductRequest request, Model model) {
    this.model = model;
    this.command.execute(new Product(request.getId(), request.getName()));
    return "created/product";
  }

  @EventListener
  public void listener(ProductCreatedEvent event) {
    this.model.addAttribute("product", event.getProduct());
  }
}
