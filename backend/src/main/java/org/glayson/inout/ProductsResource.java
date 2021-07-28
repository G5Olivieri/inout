package org.glayson.inout;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheRepositoryResource;

public interface ProductsResource extends PanacheRepositoryResource<ProductRepository, Product, Long> { }
