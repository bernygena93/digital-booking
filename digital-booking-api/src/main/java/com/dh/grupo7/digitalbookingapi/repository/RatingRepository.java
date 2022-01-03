package com.dh.grupo7.digitalbookingapi.repository;

import com.dh.grupo7.digitalbookingapi.entity.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<RatingEntity, Long> {
}
