package com.dh.grupo7.digitalbookingapi.controller;

import com.dh.grupo7.digitalbookingapi.dto.CityDto;
import com.dh.grupo7.digitalbookingapi.mapper.CityMapper;
import com.dh.grupo7.digitalbookingapi.model.City;
import com.dh.grupo7.digitalbookingapi.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/city")
public class CityController {
    private final CityService cityService;
    private final CityMapper cityMapper;

    @Autowired
    public CityController(CityService cityService, CityMapper cityMapper) {
        this.cityService = cityService;
        this.cityMapper = cityMapper;
    }

    @PostMapping(path = "/create")
    public ResponseEntity<?> createCity(@RequestBody CityDto cityDto) {
        if (cityDto.getId() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Can not create a City with a not null ID");
        }
        City city = cityMapper.dtoToModel(cityDto);
        return ResponseEntity.ok(cityService.create(city));
    }

    @GetMapping(path = "/read/all")
    public ResponseEntity<?> readCities() {
        List<City> categories = cityService.readAll();
        if (categories.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empty database.");
        }
        return ResponseEntity.ok(categories
                .stream()
                .map(cityMapper::modelToDto)
                .collect(Collectors.toList()));
    }

}
