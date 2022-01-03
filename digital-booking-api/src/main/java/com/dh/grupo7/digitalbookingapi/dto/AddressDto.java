package com.dh.grupo7.digitalbookingapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto {
    private Long id;
    private String address;
    private String latitude;
    private String longitude;
}
