package com.apolloeatsapi.ApolloEats.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data //provide getter and setter
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

    @Lob
    @Column(name="file")
    private byte[] file;

    @Column(name="dishes")
    private Map<String,Integer> dishes;

    @OneToOne(mappedBy = "menu")
    private Restaurant restaurant;

}
