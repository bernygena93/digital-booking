package com.dh.grupo7.digitalbookingapi.controller;

import com.dh.grupo7.digitalbookingapi.dto.RatingDto;
import com.dh.grupo7.digitalbookingapi.mapper.RatingMapper;
import com.dh.grupo7.digitalbookingapi.model.Rating;
import com.dh.grupo7.digitalbookingapi.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rating")
public class RatingController {
    private final RatingService ratingService;
    private final RatingMapper ratingMapper;

    @Autowired
    public RatingController(RatingService ratingService, RatingMapper ratingMapper) {
        this.ratingService = ratingService;
        this.ratingMapper = ratingMapper;
    }

    @PostMapping(path = "/")
    public ResponseEntity<?> createRating(@RequestBody RatingDto ratingDto) {
        if (ratingDto.getId() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Can not create a Rating with a not null ID");
        }
        Rating rating = ratingMapper.dtoToModel(ratingDto);
        return ResponseEntity.ok(ratingService.create(rating));
    }

    @GetMapping(path = "/")
    public ResponseEntity<?> readRatings() {
        List<Rating> categories = ratingService.readAll();
        if (categories.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empty database.");
        }
        return ResponseEntity.ok(categories
                .stream()
                .map(ratingMapper::modelToDto)
                .collect(Collectors.toList()));
    }

}
