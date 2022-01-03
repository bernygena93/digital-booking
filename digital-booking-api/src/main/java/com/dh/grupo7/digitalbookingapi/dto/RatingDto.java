package com.dh.grupo7.digitalbookingapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RatingDto {
    private Long id;
    private int rating;
    private ProductDto product;
    private UserDto user;
}