package com.apolloeatsapi.ApolloEats.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

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

    //JPA knows that this is a Clob, character based automatically
    //We need to make the column length longer, or it will default short.
    @Lob @Basic(fetch=LAZY)
    @Column(name="file", length = 20971520)
    private String file;

    @OneToOne(mappedBy = "license")
    private Restaurant restaurant;
}
