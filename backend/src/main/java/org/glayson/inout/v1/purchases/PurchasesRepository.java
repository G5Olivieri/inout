package org.glayson.inout.v1.purchases;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PurchasesRepository implements PanacheRepository<Purchase> { }
