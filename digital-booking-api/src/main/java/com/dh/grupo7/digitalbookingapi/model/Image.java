package com.dh.grupo7.digitalbookingapi.model;

import com.dh.grupo7.digitalbookingapi.entity.ProductEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Image {
    private Long id;
    private String title;
    private String image;
}