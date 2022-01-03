package com.dh.grupo7.digitalbookingapi.repository;

import com.dh.grupo7.digitalbookingapi.entity.CityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<CityEntity, Long> {
}
