package com.apolloeatsapi.ApolloEats.Controller;

import com.apolloeatsapi.ApolloEats.Entity.Image;
import com.apolloeatsapi.ApolloEats.Entity.Restaurant;
import com.apolloeatsapi.ApolloEats.Repo.ImageRepo;
import com.apolloeatsapi.ApolloEats.Repo.LicenseRepo;
import com.apolloeatsapi.ApolloEats.Repo.MenuRepo;
import com.apolloeatsapi.ApolloEats.Repo.RestaurantRepo;
import com.apolloeatsapi.ApolloEats.Service.RestaurantService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/restaurant")
public class RestaurantController {
    @Autowired
    RestaurantService service;
    @Autowired
    private RestaurantRepo restaurantRepo;
    @Autowired
    private ImageRepo imageRepo;
    @Autowired
    private LicenseRepo licenseRepo;
    @Autowired
    private MenuRepo menuRepo;

    @PostMapping(value="/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Restaurant> upload(
            @RequestPart(value = "restaurant", required=true) String jsonRestaurant,
            @RequestPart(value = "files", required = true) MultipartFile files[]
    ) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Restaurant restaurant = mapper.readValue(jsonRestaurant, Restaurant.class);
        return ResponseEntity.ok(service.upload(restaurant, files));
    }

    @GetMapping("/")
    public List<Map<String, byte[]>> GetRestaurants(){
        //get list of restaurants with registered=true
        List<Restaurant> restaurantList = restaurantRepo.findByRegistered(true);
        //get list of images
        List<Map<String,byte[]>> list = new ArrayList<>();
        Map<String,byte[]> obj = new HashMap<>();
        List<byte[]> imageList = new ArrayList<>();
        for(Restaurant restaurant : restaurantList){
            String restaurantName = restaurant.getName();
            byte[] imageByte = restaurant.getImage().getPic();
            obj.put(restaurantName, imageByte);
            list.add(obj);
            System.out.println("Restaurant name : " + restaurantName);
        }
        return  list;
    }




}
