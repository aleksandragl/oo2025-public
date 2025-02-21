package ee.aleksandra.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.DuplicateFormatFlagsException;

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

    //@many to many
    //@manytoone
    //@onetomany
    //@onetoone

    //OneToOne ---> User <-> Contact

    @ManyToOne
    private Category category;
   // public void setPrice(double price) {}

}
