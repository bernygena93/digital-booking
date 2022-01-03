package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.ProductEntity;
import com.dh.grupo7.digitalbookingapi.mapper.ProductMapper;
import com.dh.grupo7.digitalbookingapi.model.Product;
import com.dh.grupo7.digitalbookingapi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public Long create(Product product) {
        ProductEntity productEntity = productMapper.modelToEntity(product);
        ProductEntity savedProduct = productRepository.save(productEntity);
        return savedProduct.getId();
    }

    @Override
    public Product read(Long id) {
        Optional<ProductEntity> productObtained = productRepository.findById(id);
        return productObtained.map(productMapper::entityToModel)
                .orElse(null);
    }

    @Override
    public List<Product> readAll() {

        List<ProductEntity> categories = productRepository.findAll();
        return categories
                .stream()
                .map(productMapper::entityToModel)
                .collect(Collectors.toList());
    }

    @Override
    public void update(Product product) {
        ProductEntity productEntity = productMapper.modelToEntity(product);
        productRepository.save(productEntity);
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> findProductsByCategory(Long id) {
        List<ProductEntity> categories = productRepository.findProductsByCategoryId(id);
        return categories
                .stream()
                .map(productMapper::entityToModel)
                .collect(Collectors.toList());
    }

    /* BUSCAR POR CIUDAD Y FECHA INCLUIDOS EN EL SEARCH
    @Override
    public List<Product> findProductsByCity(Long id) {
        List<ProductEntity> categories = productRepository.findProductsByCityId(id);
        return categories
                .stream()
                .map(productMapper::entityToModel)
                .collect(Collectors.toList());
    }

    @Override
    public List<Product> findProductsByDate(LocalDate checkInDate, LocalDate checkOutDate) {
        List<ProductEntity> products = productRepository.findProductsByDate(checkInDate, checkOutDate);
        return products
                .stream()
                .map(productMapper::entityToModel)
                .collect(Collectors.toList());
    }

    @Override
    public List<Product> findProductsByDateAndCity(LocalDate checkInDate, LocalDate checkOutDate, Long cityId) {
        List<ProductEntity> products = productRepository.findProductsByDateAndCity(checkInDate, checkOutDate, cityId);
        return products
                .stream()
                .map(productMapper::entityToModel)
                .collect(Collectors.toList());
    }*/

    @Override
    public List<Product> searchByParameters(Optional<LocalDate> checkInDate, Optional<LocalDate> checkOutDate, Optional<Long> cityId) {
        List<ProductEntity> products = checkInDate.flatMap(checkIn ->
                checkOutDate.map(checkOut ->
                        cityId.map(city ->
                                productRepository.findProductsByDateAndCity(checkIn, checkOut, city))
                                .orElse(productRepository.findProductsByDate(checkIn, checkOut))
                )).orElse(cityId.map(productRepository::findProductsByCityId)
                .orElse(new ArrayList<>()));

        return products.stream().map(productMapper::entityToModel).collect(Collectors.toList());
    }
}
