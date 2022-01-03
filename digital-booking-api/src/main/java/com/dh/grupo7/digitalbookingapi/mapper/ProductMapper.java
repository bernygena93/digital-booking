package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.ProductDto;
import com.dh.grupo7.digitalbookingapi.entity.ProductEntity;
import com.dh.grupo7.digitalbookingapi.model.Product;
import com.dh.grupo7.digitalbookingapi.model.Rating;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    ObjectMapper mapper;
    private final ImageMapper imageMapper;
    private final FeatureMapper featureMapper;
    private final RatingMapper ratingMapper;
    private final BookingMapper bookingMapper;

    @Autowired
    public ProductMapper(ObjectMapper mapper, ImageMapper imageMapper, FeatureMapper featureMapper, RatingMapper ratingMapper, BookingMapper bookingMapper) {
        this.mapper = mapper;
        this.imageMapper = imageMapper;
        this.featureMapper = featureMapper;
        this.ratingMapper = ratingMapper;
        this.bookingMapper = bookingMapper;
    }

    public Product entityToModel(ProductEntity productEntity) {
        Product product = mapper.convertValue(productEntity, Product.class);
        product.setImages(productEntity.getImages().stream().map(imageMapper::entityToModel).collect(Collectors.toSet()));
        product.setFeatures(productEntity.getFeatures().stream().map(featureMapper::entityToModel).collect(Collectors.toSet()));
        product.setRatings(productEntity.getRatings().stream().map(ratingMapper::entityToModel).collect(Collectors.toSet()));
        product.setBookings(productEntity.getBookings().stream().map(bookingMapper::entityToModel).collect(Collectors.toSet()));
        product.setRatings(productEntity.getRatings().stream().map(ratingMapper::entityToModel).collect(Collectors.toSet()));
        return product;
    }

    public ProductEntity modelToEntity(Product product) {
        ProductEntity productEntity = mapper.convertValue(product, ProductEntity.class);
        productEntity.setImages(product.getImages().stream().map(imageMapper::modelToEntity).collect(Collectors.toSet()));
        productEntity.getImages().forEach(imageEntity -> imageEntity.setProduct(productEntity));

        productEntity.setFeatures(product.getFeatures().stream().map(featureMapper::modelToEntity).collect(Collectors.toSet()));
        productEntity.getFeatures().forEach(featureEntity -> featureEntity.getProducts().add(productEntity));

        return productEntity;
    }

    public ProductDto modelToDto(Product product) {
        ProductDto productDto = mapper.convertValue(product, ProductDto.class);
        productDto.setAverageRating(product.averageRating());
        return productDto;
    }

    public Product dtoToModel(ProductDto productDto) {
        return mapper.convertValue(productDto, Product.class);
    }
}
