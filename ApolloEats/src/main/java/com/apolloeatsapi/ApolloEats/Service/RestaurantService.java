package com.apolloeatsapi.ApolloEats.Service;

import com.apolloeatsapi.ApolloEats.Entity.Image;
import com.apolloeatsapi.ApolloEats.Entity.License;
import com.apolloeatsapi.ApolloEats.Entity.Menu;
import com.apolloeatsapi.ApolloEats.Entity.Restaurant;
import com.apolloeatsapi.ApolloEats.Repo.ImageRepo;
import com.apolloeatsapi.ApolloEats.Repo.LicenseRepo;
import com.apolloeatsapi.ApolloEats.Repo.MenuRepo;
import com.apolloeatsapi.ApolloEats.Repo.RestaurantRepo;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.codec.binary.Base64;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    private final ImageRepo imageRepo;
    private final LicenseRepo licenseRepo;
    private final MenuRepo menuRepo;
    private final RestaurantRepo restaurantRepo;

    public Restaurant upload(Restaurant restaurant, MultipartFile files[]) throws IOException {
        //save restaurant to repository
        Restaurant newRestaurant = restaurantRepo.save(restaurant);

        try {

            Image image = getImage(files[0], newRestaurant);
            imageRepo.save(image);
            File temp = getFileClob(files[1], files[1].getOriginalFilename());
            License license = getLicense(files[1], newRestaurant, temp);
            licenseRepo.save(license);
            temp = getFileClob(files[2], files[2].getOriginalFilename());
            Menu menu = getMenu(files[2], newRestaurant, temp);
            menuRepo.save(menu);


            newRestaurant.setImage(image);
            newRestaurant.setLicense(license);
            newRestaurant.setMenu(menu);
            restaurantRepo.save(newRestaurant);

        }catch(Exception e){
            e.printStackTrace();
        }
        return newRestaurant;
    }


    private File getFileClob(MultipartFile multipartFile, String fileName) throws FileNotFoundException {
        File tempFile = new File(fileName);
        try(FileOutputStream fos = new FileOutputStream(tempFile)){
            fos.write(multipartFile.getBytes());
            fos.close();
        }catch(IOException e){
            e.printStackTrace();
        }
        return tempFile;
    }
    private String encodeFileToBase64Binary(String fileName, File file) throws IOException {
        byte[] encoded = Base64.encodeBase64(FileUtils.readFileToByteArray(file));
        return new String(encoded, StandardCharsets.US_ASCII);
    }

    private Image getImage(MultipartFile file, Restaurant restaurant) throws IOException {
        return Image.builder()
                .filename(file.getOriginalFilename())
                .pic(file.getBytes())
                .restaurant(restaurant)
                .build();
    }

    private License getLicense(MultipartFile file, Restaurant restaurant, File temp) throws IOException {
        return License.builder()
                .filename(file.getOriginalFilename())
                .file(encodeFileToBase64Binary(file.getOriginalFilename(), temp))
                .restaurant(restaurant)
                .build();
    }

    private Menu getMenu(MultipartFile file, Restaurant restaurant, File temp) throws IOException{
        return Menu.builder()
                .filename(file.getOriginalFilename())
                .file(encodeFileToBase64Binary(file.getOriginalFilename(), temp))
                .restaurant(restaurant)
                .build();
    }
}

