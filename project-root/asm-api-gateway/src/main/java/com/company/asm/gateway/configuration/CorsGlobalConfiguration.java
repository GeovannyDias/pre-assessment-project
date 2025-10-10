package com.company.asm.gateway.configuration;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;

@Configuration
public class CorsGlobalConfiguration {
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowCredentials(true); // When allowCredentials is true, allowedOrigins cannot contain the special value "*" 
        // corsConfig.setAllowedOrigins(List.of("*")); // Orígenes permitidos
        corsConfig.setAllowedOriginPatterns(List.of("*")); // o usa "*" solo para desarrollo
        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        corsConfig.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}


// allowCredentials = true: Permite al navegador incluir cookies o tokens de sesión. 
// allowCredentials = false: El navegador NO envía cookies ni headers de autenticación.
// Esta opción controla si el navegador puede enviar cookies, headers de autenticación (Authorization), 
// o certificados TLS en solicitudes CORS a tu backend.
// --corsConfig.setAllowedOriginPatterns(List.of("http://localhost:4200", "https://tusitio.com"))
