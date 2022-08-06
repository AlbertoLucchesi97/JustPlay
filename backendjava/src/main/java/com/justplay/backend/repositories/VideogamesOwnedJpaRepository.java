package com.justplay.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.justplay.backend.models.VideogameOwned;

import java.util.List;

@Repository
public interface VideogamesOwnedJpaRepository extends JpaRepository<VideogameOwned, Long> {
    
    @Query(value = "SELECT videogame_id FROM videogames_owned WHERE user_email = ?1", nativeQuery = true)
    List<Long> getVideogamesIdByEmail(String userEmail);

    @Modifying @Transactional
    @Query(value = "DELETE FROM videogames_owned WHERE user_email = ?1 AND videogame_id = ?2", nativeQuery = true)
    void deleteVideogameOwned(String userEmail, Long videogameId);
}