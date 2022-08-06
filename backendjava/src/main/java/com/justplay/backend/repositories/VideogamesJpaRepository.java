package com.justplay.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.justplay.backend.models.Videogame;

@Repository
public interface VideogamesJpaRepository extends JpaRepository<Videogame, Long> {
    @Query(value = "SELECT * FROM videogames ORDER BY year DESC", nativeQuery = true)
    List<Videogame> getAndSortAllVideogamesByYear();

    @Query(value = "SELECT * FROM videogames ORDER BY title ASC", nativeQuery = true)
    List<Videogame> getAndSortAllVideogamesByTitle();

    @Query(value = "SELECT * FROM videogames WHERE genre LIKE ?1", nativeQuery = true)
    List<Videogame> getVideogamesByGenre(String genre);

    @Query(value = "SELECT * FROM videogames WHERE title LIKE ?1", nativeQuery = true)
    List<Videogame> getVideogamesBySearching(String search);

    @Query(value = "SELECT * FROM videogames WHERE title LIKE ?1 ORDER BY year DESC", nativeQuery = true)
    List<Videogame> getVideogamesBySearchingAndSortByYear(String search);

    @Query(value = "SELECT * FROM videogames WHERE title LIKE ?1 ORDER BY title ASC", nativeQuery = true)
    List<Videogame> getVideogamesBySearchingAndSortByTitle(String search);
}
