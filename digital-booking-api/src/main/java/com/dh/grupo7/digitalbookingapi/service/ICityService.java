package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.model.City;

import java.util.List;

public interface ICityService {
    Long create(City city);

    City read(Long id);

    List<City> readAll();

    void update(City cityEntity);

    void delete(Long id);
}