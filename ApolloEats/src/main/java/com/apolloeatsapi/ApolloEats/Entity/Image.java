package com.apolloeatsapi.ApolloEats.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Data //provide getter and setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="image")
public class Image {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="filename")
    private String filename;

    @Lob @Basic(fetch=LAZY)
    @Column(name="pic", columnDefinition = "BLOB")
    private byte[] pic;

    @OneToOne(mappedBy = "image")
    private Restaurant restaurant;
}
