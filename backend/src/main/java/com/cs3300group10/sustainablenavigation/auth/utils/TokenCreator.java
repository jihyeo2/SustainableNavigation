package com.cs3300group10.sustainablenavigation.auth.utils;

import com.cs3300group10.sustainablenavigation.auth.config.SecurityConfigParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class TokenCreator {

    /**
     * Json web token encoder
     */
    private final JwtEncoder encoder;

    /**
     * Security parameter configuration
     */
    @Autowired
    private SecurityConfigParams params;

    /**
     * A constructor for the token creator class
     * @param encoder the encoder class to use to encode a set of claims.
     */
    public TokenCreator(JwtEncoder encoder) {
        this.encoder = encoder;
    }

    /**
     * Generates an encoded JWT given a user authentication.
     * @param authentication authentication of the user
     * @return encoded JWT.
     */
    public String generate(Authentication authentication) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(now.plusMillis(params.getExpiration()))
                .subject(authentication.getName())
                .build();
        JwtEncoderParameters tokenParams = JwtEncoderParameters.from(claims);
        return encoder.encode(tokenParams).getTokenValue();
    }

}