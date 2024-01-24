package com.cs3300group10.sustainablenavigation.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import lombok.Data;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

/**
 * Loads security configurations from application.properties.
 */
@Data
@ConfigurationProperties(prefix = "security-config")
public class SecurityConfigParams {

    /**
     * BCrypt password encoding strength parameter
     */
    private int strength;

    /**
     * Expiration of JWTs in milliseconds
     */
    private long expiration;

    /**
     * RSA private key used with JWTs
     */
    RSAPrivateKey privateKey;

    /**
     * RSA public key used with JWTs
     */
    RSAPublicKey publicKey;

}
