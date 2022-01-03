package com.dh.grupo7.digitalbookingapi.repository;

import com.dh.grupo7.digitalbookingapi.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    List<BookingEntity> findByProductId(Long id);

    List<BookingEntity> findByCheckInDateAfter(LocalDate checkInDate);

    @Query("FROM BookingEntity b WHERE b.checkOutDate > ?1 AND b.checkInDate < ?2")
    List<BookingEntity> findByDates(LocalDate startingDate, LocalDate endingDate);

    List<BookingEntity> findByUserId(Long user_id);
}
