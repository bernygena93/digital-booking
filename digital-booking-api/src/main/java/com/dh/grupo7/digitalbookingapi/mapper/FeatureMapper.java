package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.FeatureDto;
import com.dh.grupo7.digitalbookingapi.entity.FeatureEntity;
import com.dh.grupo7.digitalbookingapi.model.Feature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class FeatureMapper {
    ObjectMapper mapper;

    @Autowired
    public FeatureMapper(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public Feature entityToModel(FeatureEntity featureEntity) {
        return mapper.convertValue(featureEntity, Feature.class);
    }

    public FeatureEntity modelToEntity(Feature feature) {
        return mapper.convertValue(feature, FeatureEntity.class);
    }

    public FeatureDto modelToDto(Feature feature) {
        return mapper.convertValue(feature, FeatureDto.class);
    }

    public Feature dtoToModel(FeatureDto featureDto) {
        return mapper.convertValue(featureDto, Feature.class);
    }
}