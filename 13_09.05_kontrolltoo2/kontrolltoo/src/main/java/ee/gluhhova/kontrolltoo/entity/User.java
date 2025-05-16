package ee.gluhhova.kontrolltoo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String username;
    private String email;

    // Address fields
    private String addressStreet;
    private String addressSuite;
    private String addressCity;
    private String addressZipcode;

    // Geo fields (part of address)
    private String geoLat;
    private String geoLng;

    private String phone;
    private String website;

    // Company fields
    private String companyName;
    private String companyCatchPhrase;
    private String companyBs;

    // 3ks
    private String password;
}
