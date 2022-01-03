package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.RatingEntity;
import com.dh.grupo7.digitalbookingapi.mapper.RatingMapper;
import com.dh.grupo7.digitalbookingapi.model.Rating;
import com.dh.grupo7.digitalbookingapi.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RatingService implements IRatingService {
    private final RatingRepository ratingRepository;
    private final RatingMapper ratingMapper;

    @Autowired
    public RatingService(RatingRepository ratingRepository, RatingMapper ratingMapper) {
        this.ratingRepository = ratingRepository;
        this.ratingMapper = ratingMapper;
    }

    public Long create(Rating rating) {

        RatingEntity ratingEntity = ratingMapper.modelToEntity(rating);
        RatingEntity savedRating = ratingRepository.save(ratingEntity);
        return savedRating.getId();
    }

    @Override
    public Rating read(Long id) {
        Optional<RatingEntity> ratingObtained = ratingRepository.findById(id);
        return ratingObtained.map(ratingMapper::entityToModel)
                .orElse(null);
    }

    @Override
    public List<Rating> readAll() {

        List<RatingEntity> categories = ratingRepository.findAll();
        return categories
                .stream()
                .map(ratingMapper::entityToModel)
                .collect(Collectors.toList());
    }

    @Override
    public void update(Rating rating) {
        RatingEntity ratingEntity = ratingMapper.modelToEntity(rating);
        ratingRepository.save(ratingEntity);
    }

    @Override
    public void delete(Long id) {
        ratingRepository.deleteById(id);
    }
}
