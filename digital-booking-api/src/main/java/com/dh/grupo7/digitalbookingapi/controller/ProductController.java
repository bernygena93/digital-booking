package com.dh.grupo7.digitalbookingapi.controller;

import com.dh.grupo7.digitalbookingapi.dto.ProductDto;
import com.dh.grupo7.digitalbookingapi.entity.ProductEntity;
import com.dh.grupo7.digitalbookingapi.mapper.ImageMapper;
import com.dh.grupo7.digitalbookingapi.mapper.ProductMapper;
import com.dh.grupo7.digitalbookingapi.model.Image;
import com.dh.grupo7.digitalbookingapi.model.Product;
import com.dh.grupo7.digitalbookingapi.service.ImageService;
import com.dh.grupo7.digitalbookingapi.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ObjectMapper mapper;
    private final ProductService productService;
    private final ProductMapper productMapper;
    private final ImageService imageService;
    private final ImageMapper imageMapper;

    @Autowired
    public ProductController(ProductService productService, ProductMapper productMapper, ImageService imageService, ImageMapper imageMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
        this.imageService = imageService;
        this.imageMapper = imageMapper;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/")
    public ResponseEntity<?> createProduct(@RequestBody ProductDto productDto) {
        if (productDto.getId() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Can not create a Product with a not null ID");
        }
        Product product = productMapper.dtoToModel(productDto);
        return ResponseEntity.ok(productService.create(product));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> readProduct(@PathVariable Long id) {
        Product product = productService.read(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        return ResponseEntity.ok(productMapper.modelToDto(product));
    }

    @GetMapping(path = "/")
    public ResponseEntity<?> readProducts() {
        List<Product> categories = productService.readAll();
        if (categories.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empty database.");
        }
        return ResponseEntity.ok(categories
                .stream()
                .map(productMapper::modelToDto)
                .collect(Collectors.toList()));
    }

    @GetMapping(path = "/category/{id}")
    public ResponseEntity<?> readProducts(@PathVariable Long id) {
        List<Product> products = productService.findProductsByCategory(id);
        if (products.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empty database.");
        }
        return ResponseEntity.ok(products
                .stream()
                .map(productMapper::modelToDto)
                .collect(Collectors.toList()));
    }

    @GetMapping(path = "/search")
    public ResponseEntity<?> searchByParameters(@RequestParam("checkInDate")
                                                @DateTimeFormat(pattern = "yyyy-MM-dd")
                                                        Optional<LocalDate> checkInDate,
                                                @RequestParam("checkOutDate")
                                                @DateTimeFormat(pattern = "yyyy-MM-dd")
                                                        Optional<LocalDate> checkOutDate,
                                                @RequestParam("cityId") Optional<Long> cityId) {
        List<Product> products = productService.searchByParameters(checkInDate, checkOutDate, cityId);
        return ResponseEntity.ok(products
                .stream()
                .map(productMapper::modelToDto)
                .collect(Collectors.toList()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(path= "/")
    public ResponseEntity<?> updateProduct(@RequestBody ProductDto productDto){
        Product product = productMapper.dtoToModel(productDto);
        if(productDto == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        productDto.getImages().stream().map(imageDto -> {
            if(imageDto.getId().equals("")){
                ProductEntity productEntity = productMapper.modelToEntity(product);
                imageDto.setProductEntity(productEntity);
                Image image = imageMapper.dtoToModel(imageDto);
                imageService.create(image);
            }
            return null;
        });
        return ResponseEntity.ok(productService.create(product));
    };

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        Product product = productService.read(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        productService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
