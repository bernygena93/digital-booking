package com.dh.grupo7.digitalbookingapi.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Features")
public class FeatureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String icon;

    @ManyToMany(mappedBy = "features")
    private Set<ProductEntity> products = new HashSet<>();

    public FeatureEntity() {
    }
}
