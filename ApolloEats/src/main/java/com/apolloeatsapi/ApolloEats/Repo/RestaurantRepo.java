package com.apolloeatsapi.ApolloEats.Repo;

import com.apolloeatsapi.ApolloEats.Entity.Menu;
import com.apolloeatsapi.ApolloEats.Entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepo extends JpaRepository<Restaurant, Long> {
    Optional<Restaurant> findByName(String name);

    List<Restaurant> findByRegistered(boolean registered);

}
