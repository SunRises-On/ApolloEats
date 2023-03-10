package com.apolloeatsapi.ApolloEats.Repo;

import com.apolloeatsapi.ApolloEats.Entity.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LicenseRepo extends JpaRepository<License, Long> {
    @Transactional
    void deleteById(long id);

    @Transactional
    void deleteByRestaurantId(long restaurantId);
}
