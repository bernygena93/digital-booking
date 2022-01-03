package com.dh.grupo7.digitalbookingapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Category {
    private Long id;
    private String name;
    private String description;
    private String urlImage;
    private Integer totalProducts;
}
