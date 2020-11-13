package org.glayson.inout.product;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GetProductController {
  @GetMapping("/products")
  public String getProduct(Model model) {
    model.addAttribute("product", new CreateProductRequest());
    return "product";
  }
}
