package com.cs3300group10.sustainablenavigation.auth.utils;

import com.cs3300group10.sustainablenavigation.auth.requests.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * A class to encrypt user passwords during signup
 */
@AllArgsConstructor
@Service
public class UserEncryption {
    /**
     * An autowired password encoder created in the SecurityConfig.
     */
    private final PasswordEncoder encoder;

    /**
     * A function which encodes the password given as part of a request
     * @param request request given
     * @return encrypted version of the request
     */
    public RegistrationRequest encode(RegistrationRequest request) {
        String encodedPassword = encoder.encode(request.getPassword());
        request.setPassword(encodedPassword);
        return request;
    }
}
