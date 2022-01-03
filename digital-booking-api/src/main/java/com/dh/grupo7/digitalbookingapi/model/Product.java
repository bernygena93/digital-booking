package com.dh.grupo7.digitalbookingapi.model;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class Product {
    private Long id;
    private String name;
    private String description;
    private City city;
    private Category category;
    private Set<Image> images = new HashSet<>();
    private Set<Feature> features = new HashSet<>();
    private Set<Rating> ratings = new HashSet<>();
    private Set<Booking> bookings = new HashSet<>();
    private Address address;
    private String houseRules;
    private String healthAndSecurity;
    private String cancelPolicy;

    public Integer averageRating(){
        if (ratings.size() == 0) {
            return 0;
        }
        return ratings.stream().map(Rating::getRating).reduce(0, Integer::sum) / ratings.size();
    }
}