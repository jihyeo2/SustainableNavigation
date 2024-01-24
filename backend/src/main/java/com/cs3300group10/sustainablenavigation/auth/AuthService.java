package com.cs3300group10.sustainablenavigation.auth;

import com.cs3300group10.sustainablenavigation.auth.exception.UsernameExistsException;
import com.cs3300group10.sustainablenavigation.auth.requests.RegistrationRequest;
import com.cs3300group10.sustainablenavigation.entities.User;
import com.cs3300group10.sustainablenavigation.entities.UserRepository;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;

/**
 * AuthService creates an abstraction between the Authentication related classes and the UserRepository.
 * It also allows us to use Springboot's AuthenticationManager class in the Security configuration.
 */
@AllArgsConstructor
@Service
public class AuthService implements UserDetailsService {

    /**
     * Autowired connection to UserRepository (which is connected to PostgreSQL database)
     */
    private UserRepository repository;

    /**
     * This function is overriden so that the AuthenticationManager class can use it as a UserDetailsService. This
     * allows the user details service to lookup usernames (which are user emails in our app) and get the password
     * associated with that account.
     *
     * @param email email of the user
     * @return Spring User Object (NOT THIS APPLICATION'S USER OBJECT)
     * @throws UsernameNotFoundException if username is not found in the database it throws this error
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("No matching email: " + email);
        }

        UserBuilder builder = org.springframework.security.core.userdetails.User.builder();

        builder.username(user.getEmail())
                .password(user.getPassword());

        return builder.build();
    }

    /**
     * Add a new user to the database. Throws an exception if the user already exists
     *
     * @param request request with information on what to add to the database
     */
    public void addUser(RegistrationRequest request) throws UsernameExistsException {
        User user = new User(request.getPassword(), request.getEmail(), request.getFirstname(), request.getLastname());
        User existingEntry = repository.findByEmail(user.getEmail());

        if (existingEntry != null) {
            throw new UsernameExistsException(user.getEmail());
        }

        repository.save(user); //Throws exception if user email already exists.
    }

    /**
     * Deletes a user from the database.
     *
     * @param email email to delete
     */
    public void deleteUser(String email) {
        repository.deleteByEmail(email);
    }
}
