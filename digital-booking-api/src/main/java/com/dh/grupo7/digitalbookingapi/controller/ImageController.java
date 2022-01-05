package com.dh.grupo7.digitalbookingapi.controller;

import com.dh.grupo7.digitalbookingapi.mapper.ImageMapper;
import com.dh.grupo7.digitalbookingapi.model.Image;
import com.dh.grupo7.digitalbookingapi.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/image")
public class ImageController {

    private final ImageService imageService;
    private final ImageMapper imageMapper;

    public ImageController(ImageService imageService, ImageMapper imageMapper) {
        this.imageService = imageService;
        this.imageMapper = imageMapper;
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Long id) {
        Image image = imageService.read(id);

        if (image == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Image not found");
        }
        imageService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
