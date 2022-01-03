package com.dh.grupo7.digitalbookingapi.dto;

import com.dh.grupo7.digitalbookingapi.entity.ProductEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageDto {
    private Long id;
    private String title;
    private String image;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private ProductEntity productEntity;
}
