package com.cs3300group10.sustainablenavigation;

import com.cs3300group10.sustainablenavigation.auth.config.SecurityConfigParams;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(SecurityConfigParams.class)
public class SustainableNavigationBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SustainableNavigationBackendApplication.class, args);
    }
}
