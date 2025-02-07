package ee.aleksandra.veebipood.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Nibernate
//automaatselt tekkin andmebaasi tabeli mis on klassi nimega

//File -> Settings -> Plugins > jpa buddy

//boolean
//String
//char

//Long ->
//int -> 2.1miljardit
//short -> 128
//byte -> 32

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String image; //.jpg
    private boolean active;

   // public void setPrice(double price) {}

}
