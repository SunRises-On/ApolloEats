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

    public Restaurant upload(Restaurant restaurant, MultipartFile files[]){
        //save restaurant to repository
        Restaurant newRestaurant = restaurantRepo.save(restaurant);

        try{
            for(int i = 0; i<3; i++){
                MultipartFile file = files[i];
                Image image = new Image();
                License license = new License();
                Menu menu = new Menu();

                String fileName = file.getOriginalFilename();
                //String sourceFileContent = new String(file.getBytes(), StandardCharsets.UTF_8);

                if(i == 0){
                    //this is string lob turn to byte[]
                    byte[] sourceFileContent = file.getBytes();

                    image.setFilename(fileName);
                    image.setPic(sourceFileContent);
                    image.setRestaurant(newRestaurant);
                    imageRepo.save(image);
                }
                else if( i == 1){
                    //this is a blob for text get char[]
//                    String sourceFileContent;
//                    LineIterator it = FileUtils.lineIterator(file, "UTF-8");
//                    try{
//                        while (it.hasNext()){
//                            String line = it.nextLine();
//                            sourceFileContent = sourceFileContent + line;
//                        }
//                    }finally{
//                        LineIterator.closeQuietly(it);
//                    }
//
//                    license.setFilename(fileName);
//                    license.setFile(sourceFileContent);
//                    license.setRestaurant(newRestaurant);
//                    licenseRepo.save(license);
                }
                else if ( i==2){
//                    menu.setFilename(fileName);
//                    menu.setFile(sourceFileContent);
//                    menu.setRestaurant(newRestaurant);
//                    menuRepo.save(menu);

//                    newRestaurant.setImage(image);
//                    newRestaurant.setLicense(license);
//                    newRestaurant.setMenu(menu);
                }
            }
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
}
