package com.justplay.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.justplay.backend.models.User;
import com.justplay.backend.models.Videogame;
import com.justplay.backend.models.VideogameOwned;
import com.justplay.backend.models.VideogameWishlist;
import com.justplay.backend.repositories.UsersJpaRepository;
import com.justplay.backend.repositories.VideogamesJpaRepository;
import com.justplay.backend.repositories.VideogamesOwnedJpaRepository;
import com.justplay.backend.repositories.VideogamesWishlistJpaRepository;

@Service
public class DataService {
    
    private VideogamesJpaRepository videogamesJpaRepository;
    private UsersJpaRepository usersJpaRepository;
    private VideogamesOwnedJpaRepository videogamesOwnedJpaRepository;
    private VideogamesWishlistJpaRepository videogamesWishlistJpaRepository;

    //#region Setting Repositories
    @Autowired
    public void setVideogamesJpaRepository(VideogamesJpaRepository videogamesJpaRepository) {
        this.videogamesJpaRepository = videogamesJpaRepository;
    }
    @Autowired
    public void setUsersJpaRepository(UsersJpaRepository usersJpaRepository) {
        this.usersJpaRepository = usersJpaRepository;
    }
    @Autowired
    public void setVideogamesOwnedJpaRepository(VideogamesOwnedJpaRepository videogamesOwnedJpaRepository) {
        this.videogamesOwnedJpaRepository = videogamesOwnedJpaRepository;
    }
    @Autowired
    public void setVideogamesWishlistJpaRepository(VideogamesWishlistJpaRepository videogamesWishlistJpaRepository) {
        this.videogamesWishlistJpaRepository = videogamesWishlistJpaRepository;
    }
    //#endregion

    //#region Videogames Service

    public List<Videogame> GetAllVideogames(String search, String sort) {
        
        List<Videogame> videogames;

        if (search == null || search.isEmpty()) {
            if (sort == null || sort.isEmpty()) {
                return videogames = videogamesJpaRepository.findAll();
            } else if (sort.equals("year")) {
                return videogames = videogamesJpaRepository.getAndSortAllVideogamesByYear();
            } else if (sort.equals("title")) {
                return videogames = videogamesJpaRepository.getAndSortAllVideogamesByTitle(); 
            } else {
                return videogames = videogamesJpaRepository.getVideogamesByGenre(sort);
            }
        } else {
            if (sort == null || sort.isEmpty()) {
                return videogames = videogamesJpaRepository.getVideogamesBySearching(search);
            } else {
                if (sort.equals("year")) {
                    return videogames = videogamesJpaRepository.getVideogamesBySearchingAndSortByYear(search);
                } else {
                    return videogames = videogamesJpaRepository.getVideogamesBySearchingAndSortByTitle(search);
                }
            }
        }
    }

    public List<Videogame> GetVideogamesById(List<Long> videogamesId) {
        List<Videogame> videogamesList = videogamesJpaRepository.findAllById(videogamesId);
        return videogamesList;
    }

    public Optional<Videogame> GetVideogame(Long id) {
        Optional<Videogame> videogame = videogamesJpaRepository.findById(id);
        return videogame;
    }

    public void PostVideogame(Videogame videogame) {
        if (videogame != null) {
            videogamesJpaRepository.save(videogame);
        }
    }

    public void UpdateVideogame(Videogame videogame) {
        if (videogame != null) {
            videogamesJpaRepository.saveAndFlush(videogame);
        }
    }

    public boolean DeleteVideogame(Long id) {
        Optional<Videogame> videogameToDelete = videogamesJpaRepository.findById(id);

        if (videogameToDelete.isPresent()) {
            Videogame videogame = videogameToDelete.get();
            videogamesJpaRepository.delete(videogame);
            return true;
        } else {
            return false;
        }
    }
    //#endregion

    //#region User Service
    public User GetUserByEmail(String email) {
        User user = usersJpaRepository.findByEmail(email);
        return user;
    }

    public void PostUser(User user) {
        usersJpaRepository.save(user);
    }
    //#endregion

    //#region VideogamesOwned Service
    public List<Long> GetVideogamesOwnedIdByEmail(String email) {
        List<Long> videogamesId = videogamesOwnedJpaRepository.getVideogamesIdByEmail(email);
        return videogamesId;
    }

    public void SaveVideogameOwned(VideogameOwned videogameOwned) {
        videogamesOwnedJpaRepository.save(videogameOwned);
    }

    public void DeleteVideogameOwned(String email, Long videogameId) {
        videogamesOwnedJpaRepository.deleteVideogameOwned(email, videogameId);
    }
    //#endregion
    
    //#region VideogamesWishlist Service
    public List<Long> GetVideogamesWishlistIdByEmail(String email) {
        List<Long> videogamesId = videogamesWishlistJpaRepository.getVideogamesIdByEmail(email);
        return videogamesId;
    }

    public void SaveVideogameWishlist(VideogameWishlist videogameWishlist) {
        videogamesWishlistJpaRepository.save(videogameWishlist);
    }

    public void DeleteVideogameWishlist(String email, Long videogameId) {
        try {
            videogamesWishlistJpaRepository.deleteVideogameWishlist(email, videogameId);
        } catch (Exception e) {
            String message = String.format("An exception has been caught: %1$s", e);
            System.out.print(message);
            throw e;
        }
    }
    //#endregion
}
