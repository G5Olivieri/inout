package org.glayson.inout.products.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})
@RestController
@RequestMapping("/api/v1/products")
public class ProductsController {
    @Autowired
    private ProductRepository repository;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Product create(@Valid @RequestBody CreateProductRequest req) {
        final var product = new Product(req.getName(), req.getPrice(), req.getQuantity());
        return repository.save(product);
    }

    @GetMapping()
    public Iterable<Product> list() {
        return repository.findAll();
    }

    @GetMapping( "/{id}")
    public ResponseEntity<Product> getById(
            @PathVariable() long id) {
        return ResponseEntity.of(repository.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(
            @PathVariable() long id,
            @RequestBody UpdateProductRequest update) {
        final var product = repository
                            .findById(id)
                            .map(p -> new Product(
                                    p.getId(),
                                    update.getName(),
                                    update.getPrice(),
                                    update.getQuantity()
                            ));
        product.ifPresent(repository::save);
        return ResponseEntity.of(product);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Product> patch(
            @PathVariable() long id,
            @RequestBody PartialUpdateProductRequest update) {
        final var product = repository
                .findById(id)
                .map(p -> new Product(
                        p.getId(),
                        Optional.ofNullable(update.getName()).orElse(p.getName()),
                        Optional.ofNullable(update.getPrice()).orElse(p.getPrice()),
                        Optional.ofNullable(update.getQuantity()).orElse(p.getQuantity())
                ));
        product.ifPresent(repository::save);
        return ResponseEntity.of(product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable() long id) {
        repository.deleteById(id);
    }
}
