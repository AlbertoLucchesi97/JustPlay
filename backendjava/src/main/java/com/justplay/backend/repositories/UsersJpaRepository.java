package com.justplay.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.justplay.backend.models.User;

@Repository
public interface UsersJpaRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM users WHERE email = ?1", nativeQuery = true)
    User findByEmail(String email);
}
