import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main (String[] args){
        String file = "src/main/resources/menu.txt";
        List<Dish> dishes = new ArrayList<>();
        dishes = CSVReader.read(file, dishes);
        for(Dish dish : dishes){
            System.out.println(dish.toString());
        }
    }
}
