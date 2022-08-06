package com.justplay.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.justplay.backend.models.*;
import com.justplay.backend.services.DataService;

@RestController
@RequestMapping("/api/videogames")
public class VideogamesRestController {

    private DataService dataService;

    @Autowired
    public void setDataService(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping()
    public ResponseEntity<List<Videogame>> GetAllVideogames(
        @RequestParam(name="search", required = false) String search, 
        @RequestParam(name="sort", required = false) String sort) {
        try {
                List<Videogame> videogames;
                
                if (search == null || search.isEmpty()) {
                    if (sort == null || sort.isEmpty()) {
                        videogames = dataService.GetAllVideogames(null, null);
                    } else {
                        videogames = dataService.GetAllVideogames(null, sort);
                    }
                } else {
                    if (sort == null || sort.isEmpty()) {
                        videogames = dataService.GetAllVideogames(search, null);
                    } else {
                        videogames = dataService.GetAllVideogames(search, sort);
                    }
                }

                if (videogames.isEmpty()) {
                    return new ResponseEntity<List<Videogame>>(HttpStatus.NO_CONTENT);
                }
                return new ResponseEntity<List<Videogame>>(videogames, HttpStatus.OK);   
        } catch (Exception e) {
            String message = String.format("An exception has been caught: %1$s", e);
            System.out.print(message);
            throw e;
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Videogame> GetVideogame(@PathVariable("id") final Long id) {
        Optional<Videogame> videogame = dataService.GetVideogame(id);
        if (videogame.isPresent()) {
            Videogame videogameToPass = videogame.get();
            return new ResponseEntity<Videogame>(videogameToPass, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Videogame>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('create:videogames')")
    public ResponseEntity<Videogame> PostVideogame(@RequestBody final Videogame videogame) {
        dataService.PostVideogame(videogame);
        return new ResponseEntity<Videogame>(videogame, HttpStatus.CREATED);
    }

    @PutMapping(value = "{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('update:videogames')")
    public ResponseEntity<Videogame> PutVideogame(@PathVariable("id") final Long id,
                                                  @RequestBody Videogame videogame) {
        Optional<Videogame> videogameToUpdate = dataService.GetVideogame(id);
        if (videogameToUpdate.isPresent()) {
            Videogame actualVideogameToUpdate = videogameToUpdate.get();
            actualVideogameToUpdate.setTitle(videogame.getTitle());
            actualVideogameToUpdate.setYear(videogame.getYear());
            actualVideogameToUpdate.setGenre(videogame.getGenre());
            actualVideogameToUpdate.setSoftwareHouse(videogame.getSoftwareHouse());
            actualVideogameToUpdate.setPublisher(videogame.getPublisher());
            actualVideogameToUpdate.setSynopsis(videogame.getSynopsis());
            actualVideogameToUpdate.setCover(videogame.getCover());
            actualVideogameToUpdate.setTrailer(videogame.getTrailer());

            dataService.UpdateVideogame(actualVideogameToUpdate);

            return new ResponseEntity<Videogame>(actualVideogameToUpdate, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Videogame>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('delete:videogames')")
    public ResponseEntity<Videogame> DeleteVideogame(@PathVariable("id") final Long id) {
        
        boolean result = dataService.DeleteVideogame(id);
        if (result == true) {
            return new ResponseEntity<Videogame>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<Videogame>(HttpStatus.NOT_FOUND);
        }
    }
}
