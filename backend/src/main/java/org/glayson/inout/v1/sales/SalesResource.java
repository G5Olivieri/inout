package org.glayson.inout.v1.sales;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Parameters;
import io.quarkus.panache.common.Sort;
import org.glayson.inout.v1.products.Product;
import org.glayson.inout.v1.products.ProductsRepository;

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

@Path("/api/v1/sales")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class SalesResource {
    private final SalesRepository salesRepository;
    private final ProductsRepository productsRepository;

    public SalesResource(SalesRepository salesRepository, ProductsRepository productsRepository) {
        this.salesRepository = salesRepository;
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
        PanacheQuery<Sale> result = this.salesRepository.findAll(sort).page(page);
        List<Link> links = Arrays.asList(Link.fromUriBuilder(
                uriInfo.getAbsolutePathBuilder()
                        .queryParam("page", 0)
                        .queryParam("size", size))
                        .rel("first")
                        .build(),
                Link.fromUriBuilder(
                        uriInfo.getAbsolutePathBuilder()
                                .queryParam("page", result.pageCount() - 1)
                                .queryParam("size", size))
                        .rel("last")
                        .build()
        );
        if (result.hasPreviousPage()) {
            links.add(Link.fromUriBuilder(
                    uriInfo.getAbsolutePathBuilder()
                            .queryParam("page", index - 1)
                            .queryParam("size", size))
                    .rel("previous")
                    .build());
        }
        if (result.hasNextPage()) {
            links.add(Link.fromUriBuilder(
                    uriInfo.getAbsolutePathBuilder()
                            .queryParam("page", index + 1)
                            .queryParam("size", size))
                    .rel("next")
                    .build());
        }
        return Response
                .ok(result.list())
                .links(links.toArray(new Link[0]))
                .build();
    }

    @POST
    @Transactional
    public Response create(CreateSale createSale) {
        Map<Long, Product> products = this.productsRepository.find(
                "id in (:ids)",
                Parameters.with(
                        "ids",
                        createSale.getProducts()
                                .stream()
                                .map(CreateSale.CreateSaleProduct::getId)
                                .collect(Collectors.toList())
                )
        ).stream()
                .collect(Collectors.toUnmodifiableMap(Product::getId, Function.identity()));

        List<String> errors = new ArrayList<>();
        List<SaleProduct> saleProducts = new ArrayList<>();

        for (CreateSale.CreateSaleProduct csp : createSale.getProducts()) {
            Product product = products.get(csp.getId());
            if (product == null) {
                errors.add(String.format("Product(id=%d) not found", csp.getId()));
                continue;
            }
            if (!product.canRemoveFromInventory(csp.getQuantity())) {
                errors.add(
                        String.format(
                                "Invalid operation to Product(id=%d): " +
                                        "desired sale product quantity is greater than product quantity in inventory",
                                csp.getId())
                );
                continue;
            }

            product.removeFromInventory(csp.getQuantity());
            saleProducts.add(new SaleProduct(product.getName(), csp.getPrice(), csp.getQuantity()));
        }

        if (!errors.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("errors", errors)).build();
        }

        Sale sale = new Sale(createSale.getDate(), saleProducts);
        this.salesRepository.persist(sale);

        return Response.created(URI.create("/sales/" + sale.getId())).build();
    }
}
