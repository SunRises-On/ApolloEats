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
import java.math.BigDecimal;
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
    @GetMapping("/dishes")
    public Map<String,ArrayList<Map<String,Object>>> GetDishes(){
        List<Restaurant> restaurantList = restaurantRepo.findAll();

        ArrayList<Map<String,Object>> topArrayListMap = new ArrayList<>();

        Map<String, ArrayList<Map<String,Object>>> mapArrayListMap = new HashMap<>();
      //  ArrayList<Map<String,Object>> arrayListMap = new ArrayList<>();

        for(Restaurant restaurant : restaurantList){
            Map<String, Object> map = new HashMap<>();

            String restName = restaurant.getName();
            map.put("name", restName);
            Long restId = restaurant.getId();
            map.put("id", restId);
            boolean restRegistered = restaurant.isRegistered();
            map.put("registered", restRegistered);
           // Map<String, Object> menu = new HashMap<>();
            List<Dishes> dishesList = restaurant.getDishesList();
            ArrayList<Map<String,Object>> arrayListMap = new ArrayList<>();

            System.out.println(dishesList.toString());
            for(Dishes dishes: dishesList){
                Map<String, Object> map2 = new HashMap<>();
                String dishName = dishes.getName();
                map2.put("name", dishName);
                Long dishId =dishes.getId();
                map2.put("id", dishId);
                BigDecimal dishPrice = dishes.getPrice();
                map2.put("price", dishPrice);
                arrayListMap.add(map2);

                map.put("menu",arrayListMap);
                System.out.println("dish name = " + dishes.getName() + " rest name = " + dishes.getRestaurant());
            }
            topArrayListMap.add(map);
            mapArrayListMap.put("restaurant",topArrayListMap);

        }
        return mapArrayListMap;
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

    //Update switch registered = !registered
    //You have to have @RequestBody for @Put mapping
    @PutMapping("/{name}/registered")
    public ResponseEntity<Restaurant> updateRegistered(
            @PathVariable String name,
            @RequestBody Restaurant restaurantDetails) throws Exception{
        System.out.println("in the ResponseEntity");
        System.out.println("The restaurant name = " + name);
        Restaurant restaurant = restaurantRepo.findByName(name)
                .orElseThrow(()-> new Exception("Restaurant not found : " + name));
        restaurant.setRegistered( !restaurant.isRegistered());
        final Restaurant updatedRestaurant = restaurantRepo.save(restaurant);
        return ResponseEntity.ok(updatedRestaurant);
    }


}
