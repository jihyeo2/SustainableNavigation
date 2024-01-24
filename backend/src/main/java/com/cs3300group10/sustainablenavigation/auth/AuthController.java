package com.cs3300group10.sustainablenavigation.auth;

import com.cs3300group10.sustainablenavigation.auth.requests.LoginResponse;
import com.cs3300group10.sustainablenavigation.auth.requests.RegistrationRequest;
import com.cs3300group10.sustainablenavigation.auth.utils.TokenCreator;
import com.cs3300group10.sustainablenavigation.auth.utils.UserEncryption;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * Controller for all auth endpoints
 */
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController()
public class AuthController {

    private final TokenCreator tokenCreator;
    private final AuthService authService;
    private final UserEncryption encryption;

    /**
     * Given an authentication, validates that it is correct and creates a JWT if login is valid. Returns 401 otherwise.
     * @param authentication basic auth provided by springboot converted into an authentication object.
     * @param resp servlet response to set (200 OK or 401 UNAUTHORIZED)
     * @return Login response with JWT
     */
    @PostMapping("/auth/login")
    public LoginResponse login(Authentication authentication, HttpServletResponse resp) {
        // Spring will respond with a 401 if user provides incorrect credentials before getting here.
        resp.setStatus(200);
        if (authentication == null){
            resp.setStatus(401);
            return new LoginResponse("");
        }
        return new LoginResponse(tokenCreator.generate(authentication));
    }

    /**
     * Signup endpoint. 400 is thrown if json does not contain all fields in RegistrationRequest since class cannot
     * be constructed with null values. 400 is also returned if the authService cannot add the user (because another
     * one with the same email exists). 201 returned if user was added successfully.
     * @param req JSON body of request converted to RegistrationRequest.
     * @param resp Servlet response (201 CREATED or 400 BAD REQUEST)
     */
    @PostMapping("/auth/signup")
    public void signup(@RequestBody RegistrationRequest req, HttpServletResponse resp) {
        resp.setStatus(201);
        try {
            authService.addUser(encryption.encode(req));
        } catch (Exception e) { // Exception will be created if user exists or authService couldn't add user
            resp.setStatus(400);
        }
    }

    /**
     * The deletion endpoint. Like login, it requires basic auth (not a JWT). It responds with 200 if user is found and
     * deleted. A 401 is given if the credentials are incorrect and a 500 is given in cases where the authentication is
     * successful, but the deletion cannot be successfully performed
     *
     * @param authentication basic auth provided by springboot converted into an authentication object.
     * @param resp the response to send back. Can be 200 OK, 500 INTERNAL SERVER ERROR, or 401 UNAUTHORIZED.
     */
    @DeleteMapping("/auth/delete")
    public void delete(Authentication authentication, HttpServletResponse resp){
        resp.setStatus(200);
        try {
            String email = authentication.getName();
            authService.deleteUser(email);
        } catch (Exception e){
            resp.setStatus(500);
        }
    }

    /**
     * Test endpoint secured by auth.
     * @param principal the authenticated user object
     * @param resp the response to send back
     * @return a simple response with the user's email
     */
    @GetMapping("/main/test")
    public String testEndpoint(Principal principal, HttpServletResponse resp) {
        resp.setStatus(200);
        return "Your email is: " + principal.getName();
    }
}
