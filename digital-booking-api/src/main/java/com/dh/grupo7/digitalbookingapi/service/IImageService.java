package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.ImageEntity;
import com.dh.grupo7.digitalbookingapi.model.Image;
import java.util.Optional;

public interface IImageService {
    void create(Image image);
    void delete(Long id);
    Image read(Long id);
}
