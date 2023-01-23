import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

public class CSVReader {

    public static final String delimiter = ",";
    public static List<Dish> read(String csvFile, List<Dish> dishesList){
        try{
            File file = new File(csvFile);
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
                Dish dish = new Dish(name, price);
                dishesList.add(dish);
            }
            br.close();
        } catch (IOException e){
            e.printStackTrace();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return  dishesList;

    }
}
