package com.tours.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    private static final String UPLOAD_DIR = "src/main/resources/static/upload_images";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize().toUri().toString();
        registry.addResourceHandler("/upload_images/**")
                .addResourceLocations(uploadPath);
    }
}
