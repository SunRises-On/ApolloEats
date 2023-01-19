package com.apolloeatsapi.ApolloEats.Repo;

import com.apolloeatsapi.ApolloEats.Entity.Menu;
import com.apolloeatsapi.ApolloEats.Entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface MenuRepo extends JpaRepository<Menu, Long> {

    @Transactional
    void deleteById(long id);

    @Transactional
    void deleteByRestaurantId(long resturantId);
}
