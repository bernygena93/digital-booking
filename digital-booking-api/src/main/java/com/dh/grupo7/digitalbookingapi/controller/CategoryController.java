package com.dh.grupo7.digitalbookingapi.controller;

import com.dh.grupo7.digitalbookingapi.dto.CategoryDto;
import com.dh.grupo7.digitalbookingapi.mapper.CategoryMapper;
import com.dh.grupo7.digitalbookingapi.model.Category;
import com.dh.grupo7.digitalbookingapi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @Autowired
    public CategoryController(CategoryService categoryService, CategoryMapper categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @PostMapping(path = "/")
    public ResponseEntity<?> createCategory(@RequestBody CategoryDto categoryDto) {
        if (categoryDto.getId() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Can not create a Category with a not null ID");
        }
        Category category = categoryMapper.dtoToModel(categoryDto);
        return ResponseEntity.ok(categoryService.create(category));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> readCategory(@PathVariable Long id) {
        Category category = categoryService.read(id);
        if (category == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
        }
        return ResponseEntity.ok(categoryMapper.modelToDto(category));
    }

    @GetMapping(path = "/")
    public ResponseEntity<?> readCategories() {
        List<Category> categories = categoryService.readAll();
        if (categories.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empty database.");
        }
        return ResponseEntity.ok(categories
                .stream()
                .map(categoryMapper::modelToDto)
                .collect(Collectors.toList()));
    }

    @PutMapping(path = "/")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryDto categoryDto) {
        if (categoryDto.getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("ID field can not be null");
        }

        Category categoryToUpdate = categoryService.read(categoryDto.getId());

        if (categoryToUpdate == null) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Category not found");
        }
        categoryService.update(categoryMapper.dtoToModel(categoryDto));
        return ResponseEntity.ok(categoryService.read(categoryDto.getId()));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        Category categoryToDelete = categoryService.read(id);

        if (categoryToDelete == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Category not found");
        }

        categoryService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
