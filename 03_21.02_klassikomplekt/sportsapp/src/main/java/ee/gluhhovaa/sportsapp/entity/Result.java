package ee.gluhhovaa.sportsapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String event;  // nimetus (100m,400m jne)
    private double value;  // result
    private int points;    // punkte

    @ManyToOne(fetch = FetchType.EAGER) //@ManyToOne
    @JoinColumn(name = "sportsperson_id", nullable = false) //@JoinColumn(name = "sportsperson_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties("results") //@JsonBackReference //unspororted media type viga oli
    //@JsonIgnoreProperties("results") //@JsonIgnoreProperties("results")
    private Sportsperson sportsperson; //tekkis viga  sportsperson_id loomisega,siis kirjutasin nagu siin (referencedColumnName = "id")et määrata võõrvõtme viidatud tabelis konkreetsele veerule.

}