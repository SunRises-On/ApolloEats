package com.apolloeatsapi.ApolloEats.Repo;

import com.apolloeatsapi.ApolloEats.Entity.Dishes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DishesRepo extends JpaRepository<Dishes,Long> {
    List<Dishes> findByRestaurantId(long restaurantId);

    @Transactional
    void deleteByRestaurantId(long restaurantId);
}
