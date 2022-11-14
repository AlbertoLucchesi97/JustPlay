package com.justplay.backend.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name= "videogames")
@Table(name="videogames")
public class Videogame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")    
    private Long Id;

    @Column(name="title")
    private String Title;
    
    @Column(name="release_date")
    private Date ReleaseDate;
    
    @Column(name="genre")
    private String Genre;
    
    @Column(name="software_house")
    private String SoftwareHouse;
    
    @Column(name="publisher")
    private String Publisher;
    
    @Column(name="synopsis")
    private String Synopsis;
    
    @Column(name="cover")
    private String Cover;
    
    @Column(name="trailer")
    private String Trailer;

    //#region Getters and Setters
    public Long getId() {
        return Id;
    }
    public void setId(Long id) {
        this.Id = id;
    }

    public String getTitle() {
        return Title;
    }
    public void setTitle(String title) {
        Title = title;
    }

    public Date getReleaseDate() {
        return ReleaseDate;
    }
    public void setReleaseDate(Date releaseDate) {
        ReleaseDate = releaseDate;
    }

    public String getGenre() {
        return Genre;
    }
    public void setGenre(String genre) {
        Genre = genre;
    }

    public String getSoftwareHouse() {
        return SoftwareHouse;
    }
    public void setSoftwareHouse(String softwareHouse) {
        SoftwareHouse = softwareHouse;
    }

    public String getPublisher() {
        return Publisher;
    }
    public void setPublisher(String publisher) {
        Publisher = publisher;
    }

    public String getSynopsis() {
        return Synopsis;
    }
    public void setSynopsis(String synopsis) {
        Synopsis = synopsis;
    }

    public String getCover() {
        return Cover;
    }
    public void setCover(String cover) {
        Cover = cover;
    }

    public String getTrailer() {
        return Trailer;
    }
    public void setTrailer(String trailer) {
        Trailer = trailer;
    }
    //#endregion
}
