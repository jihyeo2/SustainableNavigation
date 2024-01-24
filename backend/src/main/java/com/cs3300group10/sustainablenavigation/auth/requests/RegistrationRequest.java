package com.cs3300group10.sustainablenavigation.auth.requests;

import lombok.Data;
import lombok.NonNull;

/**
 * A Registration request class with information that must be present in the registration request
 */
@Data
public class RegistrationRequest {
    @NonNull
    private String password;
    @NonNull
    private String email;
    @NonNull
    private String firstname;
    @NonNull
    private String lastname;
}