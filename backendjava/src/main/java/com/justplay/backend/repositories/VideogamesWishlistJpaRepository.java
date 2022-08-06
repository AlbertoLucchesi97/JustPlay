package com.justplay.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.justplay.backend.models.VideogameWishlist;

@Repository
public interface VideogamesWishlistJpaRepository extends JpaRepository<VideogameWishlist, Long> {
    @Query(value = "SELECT videogame_id FROM videogames_wishlist WHERE user_email = ?1", nativeQuery = true)
    List<Long> getVideogamesIdByEmail(String userEmail);

    @Modifying @Transactional
    @Query(value = "DELETE FROM videogames_wishlist WHERE user_email = ?1 AND videogame_id = ?2", nativeQuery = true)
    void deleteVideogameWishlist(String userEmail, Long videogameId);
}