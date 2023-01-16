package com.apolloeatsapi.ApolloEats.Security.Entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name="jwt_security")
public class JWT_Security implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;
}
