package org.glayson.inout.v1.products;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Parameters;
import io.quarkus.panache.common.Sort;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Link;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Path("/api/v1/products/search")
public class ProductSearchResource {
    private final ProductsRepository repository;

    public ProductSearchResource(ProductsRepository repository) {
        this.repository = repository;
    }

    @GET
    public Response search(
            @QueryParam("name") String name,
            @QueryParam("page") @DefaultValue("0") int pageIndex,
            @QueryParam("size") @DefaultValue("20") int size,
            @QueryParam("sort") String[] sort,
            @Context UriInfo uriInfo
    ) {
        PanacheQuery<Product> query = getProductPanacheQuery(name, sort).page(Page.of(pageIndex, size));
        Link[] links = getLinks(query, pageIndex, size, uriInfo);
        return Response.ok(query.list()).links(links).build();
    }

    private Link[] getLinks(PanacheQuery<Product> query, int index, int size, UriInfo uriInfo) {
        List<Link> links = new ArrayList<>();
        links.add(Link.fromUriBuilder(
                uriInfo.getAbsolutePathBuilder()
                        .queryParam("page", 0)
                        .queryParam("size", size))
                        .rel("first")
                        .build());
        links.add(Link.fromUriBuilder(
                        uriInfo.getAbsolutePathBuilder()
                                .queryParam("page", query.pageCount() - 1)
                                .queryParam("size", size))
                        .rel("last")
                        .build());
        if (query.hasPreviousPage()) {
            links.add(Link.fromUriBuilder(
                    uriInfo.getAbsolutePathBuilder()
                            .queryParam("page", index - 1)
                            .queryParam("size", size))
                    .rel("previous")
                    .build());
        }
        if (query.hasNextPage()) {
            links.add(Link.fromUriBuilder(
                    uriInfo.getAbsolutePathBuilder()
                            .queryParam("page", index + 1)
                            .queryParam("size", size))
                    .rel("next")
                    .build());
        }
        return links.toArray(new Link[0]);
    }

    private PanacheQuery<Product> getProductPanacheQuery(String name, String[] sort) {
        if (name == null || name.trim().equals("")) {
            return this.repository.findAll(Sort.by(sort));
        }
        return this.repository.find(
                "lower(name) like :name",
                Sort.by(sort),
                Parameters.with("name", '%' + name.trim().toLowerCase() + '%')
        );
    }
}
