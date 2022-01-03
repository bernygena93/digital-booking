package com.dh.grupo7.digitalbookingapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private CityDto city;
    private CategoryDto category;
    private Set<ImageDto> images = new HashSet<>();
    private Set<FeatureDto> features = new HashSet<>();
    private Set<RatingDto> ratings = new HashSet<>();
    private Integer averageRating;
    private Set<BookingDto> bookings = new HashSet<>();
    private AddressDto address;
    private String houseRules;
    private String healthAndSecurity;
    private String cancelPolicy;
}
