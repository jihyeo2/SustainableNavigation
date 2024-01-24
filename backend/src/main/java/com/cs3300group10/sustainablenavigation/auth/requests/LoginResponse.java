package com.cs3300group10.sustainablenavigation.auth.requests;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Response provided when user attempts to login.
 */
@Data
@AllArgsConstructor
public class LoginResponse {
    private String jwt;
}