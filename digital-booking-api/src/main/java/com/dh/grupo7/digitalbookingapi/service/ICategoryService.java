package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.model.Category;

import java.util.List;

public interface ICategoryService {
    Long create(Category category);

    Category read(Long id);

    List<Category> readAll();

    void update(Category category);

    void delete(Long id);
}
