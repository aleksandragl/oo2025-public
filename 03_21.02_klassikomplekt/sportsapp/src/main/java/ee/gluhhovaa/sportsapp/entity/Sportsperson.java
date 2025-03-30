package ee.gluhhovaa.sportsapp.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sportspersons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sportsperson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String country;
    private int age;

    @OneToMany(mappedBy = "sportsperson", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Result> results = new ArrayList<>(); // Sportlase tulemuste loetelu, initsialiseeritud tühja nimekirjaga,kasutasin seda sest tekkis viga ja sellega ei teki viga *NullPointerException
    //private List<Result> results;

    public int getTotalPoints() {
        return results.stream().mapToInt(Result::getPoints).sum(); // Sportlase kõigi punktide summa
    }

}