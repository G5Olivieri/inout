package org.glayson.inout.v1.purchases;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Parameters;
import io.quarkus.panache.common.Sort;
import org.glayson.inout.v1.products.Product;
import org.glayson.inout.v1.products.ProductsRepository;
import org.glayson.inout.v1.sales.Sale;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("/api/v1/purchases")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PurchasesResource {
    private final PurchasesRepository purchasesRepository;
    private final ProductsRepository productsRepository;

    public PurchasesResource(PurchasesRepository purchasesRepository, ProductsRepository productsRepository) {
        this.purchasesRepository = purchasesRepository;
        this.productsRepository = productsRepository;
    }

    @GET
    public Response list(@QueryParam("sort") @DefaultValue("date") String[] sortQuery,
                         @QueryParam("direction") @DefaultValue("Ascending") Sort.Direction direction,
                         @QueryParam("page") @DefaultValue("0") int index,
                         @QueryParam("size") @DefaultValue("20") int size,
                         @Context UriInfo uriInfo) {
        Page page = Page.of(index, size);
        Sort sort = Sort.by(sortQuery).direction(direction);
        PanacheQuery<Purchase> result = this.purchasesRepository.findAll(sort).page(page);
        List<Link> links = Arrays.asList(Link
                        .fromUriBuilder(
                                uriInfo
                                        .getAbsolutePathBuilder()
                                        .queryParam("page", 0)
                                        .queryParam("size", size))
                        .rel("first")
                        .build(),
                Link
                        .fromUriBuilder(uriInfo.getAbsolutePathBuilder()
                                .queryParam("page", result.pageCount() - 1)
                                .queryParam("size", size))
                        .rel("last")
                        .build()
        );
        if (result.hasPreviousPage()) {
            links.add(Link.fromUriBuilder(uriInfo
                    .getAbsolutePathBuilder()
                    .queryParam("page", index - 1)
                    .queryParam("size", size))
                    .rel("previous")
                    .build());
        }
        if (result.hasNextPage()) {
            Link next = Link.fromUriBuilder(uriInfo
                    .getAbsolutePathBuilder()
                    .queryParam("page", index + 1)
                    .queryParam("size", size))
                    .rel("next")
                    .build();
            links.add(next);
        }
        return Response
                .ok(result.list())
                .links(links.toArray(new Link[0]))
                .build();
    }

    @POST
    @Transactional
    public Response create(CreatePurchase createPurchase) {
        Map<Long, Product> products = this.productsRepository.find(
                "id in (:ids)",
                Parameters.with(
                        "ids",
                        createPurchase.getProducts()
                                .stream()
                                .map(CreatePurchase.CreateSaleProduct::getId)
                                .collect(Collectors.toList())
                )
        ).stream()
         .collect(Collectors.toUnmodifiableMap(Product::getId, Function.identity()));

        List<String> errors = new ArrayList<>();
        List<PurchaseProduct> purchaseProducts = new ArrayList<>();

        for (CreatePurchase.CreateSaleProduct csp : createPurchase.getProducts()) {
            Product product = products.get(csp.getId());
            if (product == null) {
                errors.add(String.format("Product(id=%d) not found", csp.getId()));
                continue;
            }
            product.addInInventory(csp.getQuantity());
            purchaseProducts.add(new PurchaseProduct(product.getName(), csp.getPrice(), csp.getQuantity()));
        }

        if (!errors.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("errors", errors)).build();
        }

        Purchase purchase = new Purchase(createPurchase.getDate(), purchaseProducts);
        this.purchasesRepository.persist(purchase);

        return Response.created(URI.create("/purchases/" + purchase.getId())).build();
    }
}
