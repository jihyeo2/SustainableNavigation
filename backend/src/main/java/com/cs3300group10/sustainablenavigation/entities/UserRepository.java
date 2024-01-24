package com.cs3300group10.sustainablenavigation.entities;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * User repository which connects the User class to the SQL backend.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    @Transactional
    void deleteByEmail(String email);
}