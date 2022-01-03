package com.dh.grupo7.digitalbookingapi.repository;

import com.dh.grupo7.digitalbookingapi.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    List<ProductEntity> findProductsByCategoryId(Long id);

    List<ProductEntity> findProductsByCityId(Long id);

    @Query("FROM ProductEntity p2 WHERE p2.id NOT IN" +
            "(SELECT p.id FROM ProductEntity p " +
            "INNER JOIN BookingEntity b ON p.id = b.product.id " +
            "AND b.checkInDate < ?2 AND b.checkOutDate > ?1)")
    List<ProductEntity> findProductsByDate(LocalDate checkInDate, LocalDate checkOutDate);

    @Query("FROM ProductEntity p2 WHERE p2.id NOT IN" +
            "(SELECT p.id FROM ProductEntity p " +
            "INNER JOIN BookingEntity b ON p.id = b.product.id " +
            "AND b.checkInDate < ?2 AND b.checkOutDate > ?1) " +
            "AND city.id = ?3 ")
    List<ProductEntity> findProductsByDateAndCity(LocalDate checkInDate, LocalDate checkOutDate, Long cityId);
}