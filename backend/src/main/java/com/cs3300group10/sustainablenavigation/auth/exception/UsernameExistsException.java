package com.cs3300group10.sustainablenavigation.auth.exception;

/**
 * Error to throw in the case that a given username (email) exists when trying to add a user to the database.
 */
public class UsernameExistsException extends IllegalArgumentException{
    public UsernameExistsException(String username){
        super("Username: " + username + " already exists in the database!");
    }
}
