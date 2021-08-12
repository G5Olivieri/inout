package org.glayson.inout.v1.cash;

import org.glayson.inout.v1.purchases.PurchasesRepository;
import org.glayson.inout.v1.sales.SalesRepository;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.Map;

@Path("/api/v1/cash")
public class CashResource {
    private final SalesRepository salesRepository;
    private final PurchasesRepository purchasesRepository;

    public CashResource(SalesRepository salesRepository, PurchasesRepository purchasesRepository) {
        this.salesRepository = salesRepository;
        this.purchasesRepository = purchasesRepository;
    }

    @GET
    public Response getCash() {
        long salesBalance = salesRepository.findAll()
                .stream()
                .mapToLong(sale -> sale
                        .getProducts()
                        .stream()
                        .mapToLong(p -> p.getPrice() * p.getQuantity())
                        .sum()
                ).sum();

        long purchasesBalance = purchasesRepository
                .findAll()
                .stream()
                .mapToLong(purchase -> purchase
                        .getProducts()
                        .stream()
                        .mapToLong(product -> product.getPrice() * product.getQuantity())
                        .sum()
                ).sum();

       return Response.ok(Map.of("amount", salesBalance - purchasesBalance)).build();
    }
}
