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
@Table(name = "Categories")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String urlImage;
    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private Set<ProductEntity> products = new HashSet<>();

    public CategoryEntity() {
    }
}
