package com.justplay.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "videogames_owned")
@Table(name="videogames_owned")
public class VideogameOwned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long Id;

    @Column(name="user_email")
    private String UserEmail;

    @Column(name="videogame_id")
    private Long VideogameId;

    //#region Getters and Setters
    public Long getId() {
        return Id;
    }
    public void setId(Long id) {
        Id = id;
    }

    public String getUserEmail() {
        return UserEmail;
    }
    public void setUserEmail(String userEmail) {
        UserEmail = userEmail;
    }

    public Long getVideogameId() {
        return VideogameId;
    }
    public void setVideogameId(Long videogameId) {
        VideogameId = videogameId;
    }
    //#endregion
}
