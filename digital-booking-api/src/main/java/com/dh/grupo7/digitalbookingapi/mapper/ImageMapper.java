package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.ImageDto;
import com.dh.grupo7.digitalbookingapi.entity.ImageEntity;
import com.dh.grupo7.digitalbookingapi.model.Image;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class ImageMapper {
    ObjectMapper mapper;

    @Autowired
    public ImageMapper(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public Image entityToModel(ImageEntity imageEntity) {
        return mapper.convertValue(imageEntity, Image.class);
    }

    public ImageEntity modelToEntity(Image image) {
        return mapper.convertValue(image, ImageEntity.class);
    }

    public ImageDto modelToDto(Image image) {
        return mapper.convertValue(image, ImageDto.class);
    }

    public Image dtoToModel(ImageDto imageDto) {
        return mapper.convertValue(imageDto, Image.class);
    }
}
