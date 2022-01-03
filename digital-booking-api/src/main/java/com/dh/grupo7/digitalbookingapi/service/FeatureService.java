package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.FeatureEntity;
import com.dh.grupo7.digitalbookingapi.entity.ProductEntity;
import com.dh.grupo7.digitalbookingapi.mapper.FeatureMapper;
import com.dh.grupo7.digitalbookingapi.model.Feature;
import com.dh.grupo7.digitalbookingapi.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeatureService implements IFeatureService{

    private final FeatureRepository featureRepository;
    private final FeatureMapper featureMapper;
    @Autowired
    public FeatureService(FeatureRepository featureRepository, FeatureMapper featureMapper) {
        this.featureRepository = featureRepository;
        this.featureMapper = featureMapper;
    }

    @Override
    public Feature read(Long id) {
        FeatureEntity featureEntity = featureRepository.findById(id).orElse(null);
        Feature feature = featureMapper.entityToModel(featureEntity);
        return feature;
    }

    @Override
    public List<Feature> readAll() {
        List<FeatureEntity> featureEntityList = featureRepository.findAll();
        return featureEntityList
                .stream()
                .map(featureMapper::entityToModel)
                .collect(Collectors.toList());
    }
}
