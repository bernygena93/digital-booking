package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.CityEntity;
import com.dh.grupo7.digitalbookingapi.mapper.CityMapper;
import com.dh.grupo7.digitalbookingapi.model.City;
import com.dh.grupo7.digitalbookingapi.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CityService implements ICityService {
    private final CityRepository cityRepository;
    private final CityMapper cityMapper;

    @Autowired
    public CityService(CityRepository cityRepository, CityMapper cityMapper) {
        this.cityRepository = cityRepository;
        this.cityMapper = cityMapper;
    }

    public Long create(City city) {

        CityEntity cityEntity = cityMapper.modelToEntity(city);
        CityEntity savedCity = cityRepository.save(cityEntity);
        return savedCity.getId();
    }

    @Override
    public City read(Long id) {
        Optional<CityEntity> cityObtained = cityRepository.findById(id);
        return cityObtained.map(cityMapper::entityToModel)
                .orElse(null);
    }

    @Override
    public List<City> readAll() {

        List<CityEntity> categories = cityRepository.findAll();
        return categories
                .stream()
                .map(cityMapper::entityToModel)
                .collect(Collectors.toList());
    }

    @Override
    public void update(City city) {
        CityEntity cityEntity = cityMapper.modelToEntity(city);
        cityRepository.save(cityEntity);
    }

    @Override
    public void delete(Long id) {
        cityRepository.deleteById(id);
    }
}
