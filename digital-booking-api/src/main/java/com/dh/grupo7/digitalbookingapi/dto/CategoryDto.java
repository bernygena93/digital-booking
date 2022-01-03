package com.dh.grupo7.digitalbookingapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDto {
    private Long id;
    private String name;
    private String description;
    private String urlImage;
    private Integer totalProducts;
}
