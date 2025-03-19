package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Zezwala na wszystkie ścieżki
                        .allowedOrigins("http://localhost:3000") // Zezwala na frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Zezwala na metody HTTP
                        .allowCredentials(true);
            }
        };
    }
}