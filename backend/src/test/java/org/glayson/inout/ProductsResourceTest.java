package org.glayson.inout;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class ProductsResourceTest {
    @Inject
    ObjectMapper mapper;

    @Test
    public void testCRUD() throws JsonProcessingException {
        given()
                .contentType(ContentType.JSON)
        .when()
                .get("/products")
        .then()
                .statusCode(200)
                .body(is("[]"));

        given()
                .contentType(ContentType.JSON)
                .body(mapper.writeValueAsBytes(Map.of("name", "Glayson", "price", 1L, "quantity", 1L)))
        .when()
                .post("/products")
        .then()
                .statusCode(201)
                .header("Location", endsWith("/products/1"));

        given()
                .contentType(ContentType.JSON)
        .when()
                .get("/products")
        .then()
                .statusCode(200)
                .body("size()", is(1));

        given()
                .contentType(ContentType.JSON)
                .pathParam("id", "1")
        .when()
                .get("/products/{id}")
        .then()
                .statusCode(200)
                .body("id", equalTo(1))
                .body("name", equalTo("Glayson"))
                .body("price", equalTo(1))
                .body("quantity", equalTo(1));

        given()
                .contentType(ContentType.JSON)
                .pathParam("id", "1")
                .body(mapper.writeValueAsBytes(Map.of("name", "Glayson", "price", 1, "quantity", 10)))
        .when()
                .put("/products/{id}")
        .then()
                .statusCode(204);

        given()
                .contentType(ContentType.JSON)
                .pathParam("id", "1")
        .when()
                .get("/products/{id}")
        .then()
                .statusCode(200)
                .body("id", equalTo(1))
                .body("name", equalTo("Glayson"))
                .body("price", equalTo(1))
                .body("quantity", equalTo(10));

        given()
                .contentType(ContentType.JSON)
                .pathParam("id", "1")
        .when()
                .delete("/products/{id}")
        .then()
                .statusCode(204);

        given()
                .contentType(ContentType.JSON)
                .pathParam("id", "1")
        .when()
                .delete("/products/{id}")
        .then()
                .statusCode(404);

        given()
                .contentType(ContentType.JSON)
        .when()
                .get("/products")
        .then()
                .statusCode(200)
                .body(is("[]"));
    }
}
