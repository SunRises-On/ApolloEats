package com.apolloeatsapi.ApolloEats.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//Can be PDF or Word
@Data //provide getter and setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="license")
public class License {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="filename")
    private String filename;

    @Lob
    @Column(name="file")
    private byte[] file;

    @OneToOne(mappedBy = "license")
    private Restaurant restaurant;
}
