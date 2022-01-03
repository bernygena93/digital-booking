package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.CategoryEntity;
import com.dh.grupo7.digitalbookingapi.mapper.CategoryMapper;
import com.dh.grupo7.digitalbookingapi.model.Category;
import com.dh.grupo7.digitalbookingapi.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public Long create(Category category) {

        CategoryEntity categoryEntity = categoryMapper.modelToEntity(category);
        CategoryEntity savedCategory = categoryRepository.save(categoryEntity);
        return savedCategory.getId();
    }

    @Override
    public Category read(Long id) {
        Optional<CategoryEntity> categoryObtained = categoryRepository.findById(id);
        return categoryObtained.map(categoryEntity -> {
            Category category = categoryMapper.entityToModel(categoryEntity);
            category.setTotalProducts(categoryEntity.getProducts().size());
            return category;
        }).orElse(null);
    }

    @Override
    public List<Category> readAll() {

        List<CategoryEntity> categories = categoryRepository.findAll();
        return categories
                .stream()
                .map(categoryMapper::entityToModel)
                .collect(Collectors.toList());
    }

    @Override
    public void update(Category category) {
        CategoryEntity categoryEntity = categoryMapper.modelToEntity(category);
        categoryRepository.save(categoryEntity);
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

}
