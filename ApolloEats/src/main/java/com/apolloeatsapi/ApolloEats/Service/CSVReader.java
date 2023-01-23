package com.apolloeatsapi.ApolloEats.Service;

import com.apolloeatsapi.ApolloEats.Entity.Dishes;
import com.apolloeatsapi.ApolloEats.Entity.Restaurant;
import com.apolloeatsapi.ApolloEats.Repo.DishesRepo;
import com.apolloeatsapi.ApolloEats.Repo.RestaurantRepo;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CSVReader {

    private final String delimiter = ",";
    private final DishesRepo dishesRepo;
    private final RestaurantRepo restaurantRepo;
    public CSVReader(DishesRepo dishesRepo, RestaurantRepo restaurantRepo) {
        this.dishesRepo = dishesRepo;
        this.restaurantRepo = restaurantRepo;
    }

    public  void read(File file, Restaurant restaurant){
        try{
           // File file = new File(csvFile);
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            String line = "";
            String[] tempArr;
            while((line = br.readLine()) != null){
                tempArr = line.split(delimiter);

                if(tempArr.length < 2){
                    throw new Exception("CSVReader.java line does not have enough items");
                }
                else if(tempArr.length > 2){
                    throw new Exception("CSVReader.java more than 2 lines found");
                }

                String name  = tempArr[0];
                //remove all white spaces
                tempArr[1] = tempArr[1].replaceAll("\\s","");
                BigDecimal price = new BigDecimal(tempArr[1]);
               // System.out.println("name : " + name + " price : " + price);
                Dishes dishes = getDish(restaurant, name, price);
                dishesRepo.save(dishes);
                if(restaurant.getDishesList() == null){
                    List<Dishes> dishesList = new ArrayList<>();
                    dishesList.add(dishes);
                    restaurant.setDishesList(dishesList);
                }else{
                    restaurant.getDishesList().add(dishes); // add dish to dishesList

                }
                restaurantRepo.save(restaurant); // update repository
            }
            br.close();
        } catch (IOException e){
            e.printStackTrace();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
    private Dishes getDish(Restaurant restaurant, String name, BigDecimal price){
        return Dishes.builder()
                .restaurant(restaurant)
                .name(name)
                .price(price)
                .build();
    }

}
