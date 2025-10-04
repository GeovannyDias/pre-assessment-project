package com.company.asm.gateway.error;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
public class FallbackController {
    
    @GetMapping("/fallback")
    public Mono<String> fallback() {
        log.warn("Service is currently unavailable");
        return Mono.just("The service you're trying to reach is currently unavailable. Please try again later.");
    }
}