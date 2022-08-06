package com.justplay.backend.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.justplay.backend.models.User;
import com.justplay.backend.models.Videogame;
import com.justplay.backend.models.VideogameOwned;
import com.justplay.backend.models.VideogameWishlist;
import com.justplay.backend.services.DataService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.*;

import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/users")
public class UsersRestController {

    private DataService dataService;

    @Autowired
    public void setDataService(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping()
    public ResponseEntity<User> GetUserByEmail(@RequestHeader("Authorization") 
    String bearerToken) {

        String email = getTokenEmail(bearerToken);

        User user = dataService.GetUserByEmail(email);

        if (user != null) {
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> PostUser(@RequestHeader("Authorization") 
    String bearerToken, 
    @RequestBody final User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        dataService.PostUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @GetMapping("videogamesOwned")
    public ResponseEntity<List<Videogame>> GetUserVideogamesOwned(
        @RequestHeader("Authorization") 
    String bearerToken) {
        String email = getTokenEmail(bearerToken);

        List<Long> videogamesId = dataService.GetVideogamesOwnedIdByEmail(email);
        List<Videogame> videogamesList = dataService.GetVideogamesById(videogamesId);

        if (videogamesList != null) {
            return new ResponseEntity<List<Videogame>>(videogamesList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("videogamesWishlist")
    public ResponseEntity<List<Videogame>> GetUserVideogamesWishlist(
        @RequestHeader("Authorization") 
    String bearerToken) {
        String email = getTokenEmail(bearerToken);

        List<Long> videogamesId = dataService.GetVideogamesWishlistIdByEmail(email);
        List<Videogame> videogamesList = dataService.GetVideogamesById(videogamesId);

        if (videogamesList != null) {
            return new ResponseEntity<List<Videogame>>(videogamesList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("videogamesWishlist/add/{videogameId}")
    @PreAuthorize("hasAuthority('addtowishlist:videogames')")
    public ResponseEntity<VideogameWishlist> AddVideogamesToWishlist(
        @RequestHeader("Authorization") 
    String bearerToken, @PathVariable("videogameId") Long videogameId) {
        String email = getTokenEmail(bearerToken);

        VideogameWishlist videogameWishlist = new VideogameWishlist();
        videogameWishlist.setUserEmail(email);
        videogameWishlist.setVideogameId(videogameId);

        dataService.SaveVideogameWishlist(videogameWishlist);
        return new ResponseEntity<VideogameWishlist>(videogameWishlist, HttpStatus.CREATED);
    }

    @DeleteMapping("videogamesWishlist/remove/{videogameId}")
    @PreAuthorize("hasAuthority('removefromwishlist:videogames')")
    public Long RemoveVideogamesFromWishlist(@RequestHeader("Authorization") 
    String bearerToken, 
    @PathVariable("videogameId") Long videogameId) {
        String email = getTokenEmail(bearerToken);

        dataService.DeleteVideogameWishlist(email, videogameId);
        return videogameId;
    }

    @PostMapping("videogamesOwned/add/{videogameId}")
    @PreAuthorize("hasAuthority('addtoowned:videogames')")
    public ResponseEntity<VideogameOwned> AddVideogamesToOwned(
        @RequestHeader("Authorization") 
    String bearerToken, @PathVariable("videogameId") Long videogameId) {
        String email = getTokenEmail(bearerToken);

        VideogameOwned videogameOwned = new VideogameOwned();
        videogameOwned.setUserEmail(email);
        videogameOwned.setVideogameId(videogameId);

        dataService.SaveVideogameOwned(videogameOwned);
        return new ResponseEntity<VideogameOwned>(videogameOwned, HttpStatus.CREATED);
    }

    @DeleteMapping("videogamesOwned/remove/{videogameId}")
    @PreAuthorize("hasAuthority('removefromowned:videogames')")
    public Long RemoveVideogamesFromOwned(@RequestHeader("Authorization") 
    String bearerToken, 
    @PathVariable("videogameId") Long videogameId) {
        String email = getTokenEmail(bearerToken);

        dataService.DeleteVideogameOwned(email, videogameId);
        return videogameId;
    }
    
    public String getTokenEmail(String bearerToken) {
        String[] token = bearerToken.split(" ");
        String[] splitToken = token[1].split("\\.");
        String unsignedToken = splitToken[0] + "." + splitToken[1] + ".";
    
        Jwt<?,?> jwt = Jwts.parserBuilder().build().parseClaimsJwt(unsignedToken);
        Claims claims = (Claims) jwt.getBody();
        String email = claims.get("https://example.com/email", String.class);
        return email;
    }
}
