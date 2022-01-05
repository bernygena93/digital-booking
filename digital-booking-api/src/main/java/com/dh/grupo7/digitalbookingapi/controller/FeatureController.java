package com.dh.grupo7.digitalbookingapi.controller;

import com.dh.grupo7.digitalbookingapi.mapper.FeatureMapper;
import com.dh.grupo7.digitalbookingapi.model.Feature;
import com.dh.grupo7.digitalbookingapi.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path="/feature")
public class FeatureController {
    private final FeatureService featureService;
    private final FeatureMapper featureMapper;

    @Autowired
    public FeatureController(FeatureService featureService, FeatureMapper featureMapper) {
        this.featureService = featureService;
        this.featureMapper = featureMapper;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> readFeature(@PathVariable Long id) {
        Feature feature = featureService.read(id);
        if (feature == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feature not found");
        }
        return ResponseEntity.ok(featureMapper.modelToDto(feature));
    }

    @GetMapping(path="/")
    public ResponseEntity<?> readAllFeaures(){
        List<Feature> featureList = featureService.readAll();
        if (featureList.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empty database.");
        }
        return ResponseEntity.ok(featureList
                .stream()
                .map(featureMapper::modelToDto)
                .collect(Collectors.toList()));
    }
}
