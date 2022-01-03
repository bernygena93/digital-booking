package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.model.Rating;

import java.util.List;

public interface IRatingService {
    Long create(Rating rating);

    Rating read(Long id);

    List<Rating> readAll();

    void update(Rating ratingEntity);

    void delete(Long id);
}
