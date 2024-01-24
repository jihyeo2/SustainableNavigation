package com.cs3300group10.sustainablenavigation.entities;

// Persistence

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

//Validators
import jakarta.validation.constraints.Email;

//Lombok
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * A Spring entity representing the users of our app
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Setter
    private String password;

    @Column(unique = true)
    @Email
    @Setter
    private String email;

    @Setter
    private String firstName;

    @Setter
    private String lastName;

    public User(Long id, String password, String email, String firstName, String lastName) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(String password, String email, String firstName, String lastName) {
        this(null, password, email, firstName, lastName);
    }
}
