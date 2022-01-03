package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.model.Product;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IProductService {
    Long create(Product productEntity);

    Product read(Long id);

    List<Product> readAll();

    void update(Product productEntity);

    void delete(Long id);

    List<Product> findProductsByCategory(Long id);

    /*BUSCAR POR CIDAD Y FECHA INCLUIDOS EN EL SEARCH
    List<Product> findProductsByCity(Long id);

    List<Product> findProductsByDate(LocalDate checkInDate, LocalDate checkOutDate);

    List<Product> findProductsByDateAndCity(LocalDate checkInDate, LocalDate checkOutDate, Long cityId);
    */

    List<Product> searchByParameters(Optional<LocalDate> checkInDate, Optional<LocalDate> checkOutDate, Optional<Long> cityId);
}