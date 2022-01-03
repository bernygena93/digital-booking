package com.dh.grupo7.digitalbookingapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Address {
    private Long id;
    private String address;
    private String latitude;
    private String longitude;
}
