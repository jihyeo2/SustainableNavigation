package com.cs3300group10.sustainablenavigation.auth.config;


import com.cs3300group10.sustainablenavigation.auth.AuthService;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

@EnableWebSecurity
@Configuration
@AllArgsConstructor
public class SecurityConfig {

    /**
     * Auth
     */
    private AuthService authService;

    private SecurityConfigParams params;

    /**
     * Modifies the authentication manager to use the user details service and the password encoder
     * @param http spring security's settings
     * @param encoder the password encoder to be used
     * @return the new authentication manager
     * @throws Exception passing exceptions from trying to set .userDetailsService
     */
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder encoder)
            throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(authService).passwordEncoder(encoder);
        return authenticationManagerBuilder.build();
    }


    /**
     * Modifies the security filter chain to require authentication on /main, authenticate using JWTs, set the session
     * policy to stateless (since this is a REST API) and use basic authentication on /auth endpoints that require
     * authentication (like /login and /delete)
     * @param http the security defaults to modify
     * @return the new security filter chain to use
     * @throws Exception passing exceptions thrown by the HttpSecurity class
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests(authRequests -> authRequests
                                .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                                .requestMatchers("/auth").permitAll()
                                )
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    /**
     * Creates the password encoder used. Currently, this is a BCryptPasswordEncoder with the strength parameter set
     * in application.properties.
     * @return PasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(params.getStrength());
    }

    /**
     * Creates a Nimbus JwtDecoder instance with the public key. Decoding is done with the public key so we can share
     * the public key with third parties who want to decrypt the message in order to verify that it was sent by us.
     * Note that in this setup we are not the only ones who can read the message, but we are the only ons who can
     * create messages that can be decoded by this public key.
     * @return JwtDecoder
     */
    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(params.getPublicKey()).build();
    }

    /**
     * Creates a Nimbus JwtEncoder instance with the private key and public key.
     * @return JwtEncoder
     */
    @Bean
    JwtEncoder jwtEncoder() {
        JWK keys = new RSAKey.Builder(params.getPublicKey()).privateKey(params.getPrivateKey()).build();
        JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(keys));
        return new NimbusJwtEncoder(jwkSource);
    }
}
