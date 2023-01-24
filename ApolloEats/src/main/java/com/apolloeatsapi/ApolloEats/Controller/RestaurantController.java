package com.apolloeatsapi.ApolloEats.Controller;

import com.apolloeatsapi.ApolloEats.Entity.Dishes;
import com.apolloeatsapi.ApolloEats.Entity.Image;
import com.apolloeatsapi.ApolloEats.Entity.Menu;
import com.apolloeatsapi.ApolloEats.Entity.Restaurant;
import com.apolloeatsapi.ApolloEats.Repo.*;
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
import java.util.*;

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
    @Autowired
    private DishesRepo dishesRepo;

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
    public Map<String,ArrayList<Map<String,Object>>> GetRestaurants(){
        //get list of restaurants with registered=true
        List<Restaurant> restaurantList = restaurantRepo.findByRegistered(true);

        Map<String, ArrayList<Map<String,Object>>> mapArrayListMap = new HashMap<>();
        ArrayList<Map<String,Object>> arrayListMap = new ArrayList<>();
        Integer index= 0;
        for(Restaurant restaurant : restaurantList){
            Map<String,Object> map = new HashMap<>();

            String restaurantName = restaurant.getName();
            map.put("name", restaurantName);
            byte[] imageByte = restaurant.getImage().getPic();
            map.put("image", imageByte);

            //add id for restaurants
            Long id = restaurant.getId();
            map.put("id", id);

            arrayListMap.add(map);
            mapArrayListMap.put("restaurant",arrayListMap);

            //mapReturn.put(index,map);
            System.out.println("Restaurant name : " + restaurantName);
        }
        return  mapArrayListMap;
    }
    @GetMapping("/{name}/menu")
    public List<Dishes> GetDishes(@PathVariable String name) throws Exception {
        Optional<Restaurant> optionalEntity = restaurantRepo.findByName(name);
        if( optionalEntity.isEmpty()){
            throw new Exception("Restaurant not found.");
        }
        //get restaurant object from optionalEntity
        Restaurant restaurant = optionalEntity.get();
        List<Dishes> dishes = restaurant.getDishesList();

        if(dishes.isEmpty()){
            throw new Exception("Dish list is not found.");
        }
        return restaurant.getDishesList();
    }



}
