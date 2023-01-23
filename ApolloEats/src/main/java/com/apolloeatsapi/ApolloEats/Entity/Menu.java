package com.apolloeatsapi.ApolloEats.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

import static jakarta.persistence.FetchType.LAZY;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="menu")
public class Menu {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="filename")
    private String filename;

    //JPA knows that this is a Clob, character based automatically
    //We need to make the column length longer, or it will default short.
    @Lob @Basic(fetch=LAZY)
    @Column(name="file", length = 20971520)
    private String file;

//    @Column(name="dishes")
//    private Map<String,Integer> dishes;

    @OneToOne(mappedBy = "menu")
    private Restaurant restaurant;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}
