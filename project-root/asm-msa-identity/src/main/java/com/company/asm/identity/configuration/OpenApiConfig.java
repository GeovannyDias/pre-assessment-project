package com.company.asm.identity.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Identity Service API",
        version = "1.0.0",
        description = "API para la gestión de identidades bancarias BDD_BANCO_EC",
        contact = @Contact(
            name = "Soporte Técnico",
            email = "support@company.com"
        ),
        license = @License(
            name = "Apache 2.0",
            url = "https://www.apache.org/licenses/LICENSE-2.0"
        )
    )
)
public class OpenApiConfig {

    @Value("${server.port}")
    private String serverPort;

    @Bean
    public OpenAPI identityOpenAPI() {
        Server localServer = new Server()
            .url("http://localhost:" + serverPort + "/api")
            .description("Servidor Local");

        return new OpenAPI()
            .components(new Components())
            .servers(List.of(localServer));
    }
}