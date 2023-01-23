package com.apolloeatsapi.ApolloEats.Service;

import com.apolloeatsapi.ApolloEats.Entity.Image;
import com.apolloeatsapi.ApolloEats.Entity.License;
import com.apolloeatsapi.ApolloEats.Entity.Menu;
import com.apolloeatsapi.ApolloEats.Entity.Restaurant;
import com.apolloeatsapi.ApolloEats.Repo.*;
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
/*****
* Restaurant Service handles files uploaded and stores it in the database.
 * For Entity Image - it is stored in a byte[] and is a BLOB
 * For Entities License and Menu - it is stored as a string and are CLOBs.
 * Therefore, we turn a MultipartFile into a File. Then
 * convert the file into Base64 String. Then store into the database.
 *
 * Why Base 64 String?
 * Base 64 is an encoding scheme that converts binary data into text
 * format, so the encoded textual data can be transported over the network
 * uncorrupted and without data loss.
* */
@Service
@RequiredArgsConstructor
public class RestaurantService {
    private final ImageRepo imageRepo;
    private final LicenseRepo licenseRepo;
    private final DishesRepo dishesRepo;
    private final MenuRepo menuRepo;
    private final RestaurantRepo restaurantRepo;

    public Restaurant upload(Restaurant restaurant, MultipartFile[] files) throws IOException {
        //save restaurant to repository
        Restaurant newRestaurant = restaurantRepo.save(restaurant);

        try {
            //make Entity Image
            saveImageEntity(files[0],restaurant);
            //make Entity License
            saveLicenseEntity(files[1],restaurant);
            //make Entity List<Dishes>
            saveDishesEntity(files[2],restaurant);
            //make Entity Menu
            saveMenuEntity(files[2], restaurant);

        }catch(Exception e){
            e.printStackTrace();
        }
        return newRestaurant;
    }


    private File getFileClob(MultipartFile multipartFile, String fileName) throws FileNotFoundException {
        File tempFile = new File(fileName);
        try(FileOutputStream fos = new FileOutputStream(tempFile)){
            fos.write(multipartFile.getBytes());
            //fos.close();
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

    private void saveImageEntity(MultipartFile file, Restaurant restaurant) throws IOException {
        //make Entity Image
        Image image = getImage(file, restaurant);
        imageRepo.save(image);
        restaurant.setImage(image);
        restaurantRepo.save(restaurant);
    }

    private void saveLicenseEntity(MultipartFile file, Restaurant restaurant) throws IOException{
        File temp = getFileClob(file, file.getOriginalFilename());
        License license = getLicense(file, restaurant, temp);
        licenseRepo.save(license);
        restaurant.setLicense(license);
        restaurantRepo.save(restaurant);
    }
    private void saveDishesEntity(MultipartFile file, Restaurant restaurant) throws IOException{
        File temp = getFileClob(file, file.getOriginalFilename());
        //    CopyFile copyFile = new CopyFile();
        //   File file = new File("temp.txt");
        //  copyFile.copyFile(temp, file);
        CSVReader csvReader = new CSVReader(dishesRepo,restaurantRepo);
        csvReader.read(temp, restaurant);
    }

    private void saveMenuEntity(MultipartFile file, Restaurant restaurant) throws  IOException{
        File temp = getFileClob(file, file.getOriginalFilename());
        Menu menu = getMenu(file, restaurant, temp);
        menuRepo.save(menu);
        restaurant.setMenu(menu);
        restaurantRepo.save(restaurant);
    }

}

