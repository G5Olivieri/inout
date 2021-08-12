package org.glayson.inout.v1.products;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheRepositoryResource;
import io.quarkus.rest.data.panache.ResourceProperties;


@ResourceProperties(path = "/api/v1/products")
public interface ProductsResource extends PanacheRepositoryResource<ProductsRepository, Product, Long> { }
