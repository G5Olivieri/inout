package org.glayson.inout.v1.products;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProductsRepository implements PanacheRepository<Product> { }
