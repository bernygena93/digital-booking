package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.CategoryDto;
import com.dh.grupo7.digitalbookingapi.entity.CategoryEntity;
import com.dh.grupo7.digitalbookingapi.model.Category;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    ObjectMapper mapper;

    @Autowired
    public CategoryMapper(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public Category entityToModel(CategoryEntity categoryEntity) {
        Integer totalProducts = categoryEntity.getProducts().size();
        Category category =  mapper.convertValue(categoryEntity, Category.class);
        category.setTotalProducts(totalProducts);
        return category;
    }

    public CategoryEntity modelToEntity(Category category) {
        return mapper.convertValue(category, CategoryEntity.class);
    }

    public CategoryDto modelToDto(Category category) {
        return mapper.convertValue(category, CategoryDto.class);
    }

    public Category dtoToModel(CategoryDto categoryDto) {
        return mapper.convertValue(categoryDto, Category.class);
    }
}
