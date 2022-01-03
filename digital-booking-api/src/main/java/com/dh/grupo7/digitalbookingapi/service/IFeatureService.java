package com.dh.grupo7.digitalbookingapi.service;

import java.util.List;
import com.dh.grupo7.digitalbookingapi.model.Feature;

public interface IFeatureService {
    Feature read(Long id);
    List<Feature> readAll();
}
