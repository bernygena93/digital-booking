package com.dh.grupo7.digitalbookingapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Rating {
    private Long id;
    private int rating;
    private Product product;
    private User user;
}
