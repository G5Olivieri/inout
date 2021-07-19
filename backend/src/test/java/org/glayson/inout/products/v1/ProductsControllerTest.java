package org.glayson.inout.products.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ContextConfiguration(classes = {
        ProductsController.class
})
public class ProductsControllerTest {
    @MockBean
    private ProductRepository repository;

    @Autowired
    private ProductsController controller;

    private ObjectMapper objectMapper;
    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    public void returnEmptyList() throws Exception {
        when(repository.findAll()).thenReturn(Collections.emptyList());

        this.mockMvc.perform(get("/api/v1/products"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().string("[]"));
    }

    @Test
    public void returnOneProductInList() throws Exception {
        final Product product = new Product(1, "zomo", 1, 1);
        when(repository.findAll()).thenReturn(List.of(product));

        this.mockMvc.perform(get("/api/v1/products"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$.[0].id").value(product.getId()))
                .andExpect(jsonPath("$.[0].name").value(product.getName()))
                .andExpect(jsonPath("$.[0].price").value(product.getPrice()))
                .andExpect(jsonPath("$.[0].quantity").value(product.getQuantity()));
    }

    @Test
    public void getProductById() throws Exception {
        final Product product = new Product(1, "zomo", 1, 1);

        when(repository.findById(1L)).thenReturn(Optional.of(product));

        this.mockMvc.perform(get("/api/v1/products/{id}", 1L))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(product.getId()))
                .andExpect(jsonPath("$.name").value(product.getName()))
                .andExpect(jsonPath("$.price").value(product.getPrice()))
                .andExpect(jsonPath("$.quantity").value(product.getQuantity()));

        verify(repository, times(1)).findById(1L);
    }

    @Test
    public void getNonexistentProductById() throws Exception {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        this.mockMvc.perform(get("/api/v1/products/{id}", 1L))
                .andDo(print())
                .andExpect(status().isNotFound());

        verify(repository, times(1)).findById(1L);
    }

    @Test
    public void createProduct() throws Exception {
        final var request = new CreateProductRequest("Zomo de morango", 1000, 1);
        final var product = new Product(1, request.getName(), request.getPrice(), request.getQuantity());

        when(repository.save(any(Product.class))).thenReturn(product);

        this.mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request))
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$.id").value(product.getId()))
                .andExpect(jsonPath("$.name").value(product.getName()))
                .andExpect(jsonPath("$.price").value(product.getPrice()))
                .andExpect(jsonPath("$.quantity").value(product.getQuantity()));

        verify(repository, times(1)).save(argThat((Product p) -> p.getId() == 0));
    }

    @Test
    public void updateProduct() throws Exception {
        final var product = new Product(1, "Carvao", 1, 1);
        when(repository.findById(1L)).thenReturn(Optional.of(product));

        final var request = new UpdateProductRequest("Zomo de morango", 1000, 10);

        this.mockMvc.perform(put("/api/v1/products/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request))
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.name").value("Zomo de morango"))
                .andExpect(jsonPath("$.price").value(1000))
                .andExpect(jsonPath("$.quantity").value(10));

        verify(repository, times(1)).findById(1L);
    }

    @Test
    public void patchProduct() throws Exception {
        final var product = new Product(1, "Carvao", 1, 1);
        when(repository.findById(1L)).thenReturn(Optional.of(product));

        List<PartialUpdateProductRequest> cases = List.of(
                new PartialUpdateProductRequest("Zomo de morango", null, null),
                new PartialUpdateProductRequest("Zomo de morango", 1L, null),
                new PartialUpdateProductRequest("Zomo de morango", 1L, 1),
                new PartialUpdateProductRequest(null, 10L, null),
                new PartialUpdateProductRequest(null, 10L, 1),
                new PartialUpdateProductRequest(null, null, 10),
                new PartialUpdateProductRequest(null, null, null)
        );

        for (var c : cases) {
            this.performPatch(product, c);
        }

        verify(repository, times(cases.size())).findById(1L);
    }

    @Test
    public void deleteProduct() throws Exception {
        this.mockMvc.perform(delete("/api/v1/products/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

        verify(repository, times(1)).deleteById(1L);
    }

    private void performPatch(Product product, PartialUpdateProductRequest request) throws Exception {
        this.mockMvc.perform(patch("/api/v1/products/{id}", product.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request))
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$.id").value(product.getId()))
                .andExpect(jsonPath("$.name").value(request.getName() != null ? request.getName() : product.getName()))
                .andExpect(jsonPath("$.price").value(request.getPrice() != null ? request.getPrice() : product.getPrice()))
                .andExpect(jsonPath("$.quantity").value(request.getQuantity() != null ? request.getQuantity() : product.getQuantity()));
    }

}
