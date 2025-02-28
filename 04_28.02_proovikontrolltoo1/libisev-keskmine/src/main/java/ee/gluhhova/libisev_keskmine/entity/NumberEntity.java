package ee.gluhhova.libisev_keskmine.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "numbers")  //määrab andmebaasi tabeli
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class NumberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private int value;

}