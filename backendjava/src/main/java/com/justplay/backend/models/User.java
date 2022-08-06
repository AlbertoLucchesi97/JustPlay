package com.justplay.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "users")
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long Id;
    
    @Column(name="email")
    private String Email;

    @Column(name="admin")
    private Boolean Admin;

    @Column(name="auth_id")
    private String AuthId;

    //#region Getters and Setters
    public Long getId() {
        return Id;
    }
    public void setId(Long id) {
        this.Id = id;
    }

    public String getEmail() {
        return Email;
    }
    public void setEmail(String email) {
        Email = email;
    }

    public Boolean getAdmin() {
        return Admin;
    }
    public void setAdmin(Boolean admin) {
        Admin = admin;
    }

    public String getAuthId() {
        return AuthId;
    }
    public void setAuthId(String authId) {
        AuthId = authId;
    }
    //#endregion
}
