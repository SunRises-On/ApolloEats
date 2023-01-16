package com.apolloeatsapi.ApolloEats.Security.Repo;

import com.apolloeatsapi.ApolloEats.Security.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer> {

    Optional<User> findByEmail(String email);
}
