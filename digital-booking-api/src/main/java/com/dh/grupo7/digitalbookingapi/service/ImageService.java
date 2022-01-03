package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.ImageEntity;
import com.dh.grupo7.digitalbookingapi.mapper.ImageMapper;
import com.dh.grupo7.digitalbookingapi.model.Image;
import com.dh.grupo7.digitalbookingapi.repository.ImageRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService implements IImageService{

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Autowired
    public ImageService(ImageRepository imageRepository, ImageMapper imageMapper) {
        this.imageRepository = imageRepository;
        this.imageMapper = imageMapper;
    }

    @Override
    public void create(Image image) {
        ImageEntity imageEntity = imageMapper.modelToEntity(image);
        imageRepository.save(imageEntity);
    }

    @Override
    public void delete(Long id) {
        imageRepository.deleteById(id);
    }

    @Override
    public Image read(Long id) {
        ImageEntity imageEntity = imageRepository.findById(id).orElse(null);
            Image image = imageMapper.entityToModel(imageEntity);
        return image;
    }
}
