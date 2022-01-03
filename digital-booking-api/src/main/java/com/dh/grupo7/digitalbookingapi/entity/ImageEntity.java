package com.dh.grupo7.digitalbookingapi.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Images")
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String image;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    public ImageEntity(){
    }

}
