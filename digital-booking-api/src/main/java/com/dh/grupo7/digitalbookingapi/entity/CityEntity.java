package com.dh.grupo7.digitalbookingapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Cities")
public class CityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String country;
    @OneToMany(mappedBy = "city")
    @JsonIgnore
    private Set<ProductEntity> products = new HashSet<>();

    public CityEntity() {
    }
}
