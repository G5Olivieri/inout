package org.glayson.inout.v1.sales;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SalesRepository implements PanacheRepository<Sale> { }
