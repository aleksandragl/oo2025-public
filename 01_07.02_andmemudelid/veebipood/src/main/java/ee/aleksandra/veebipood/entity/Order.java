package ee.aleksandra.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")//andmebaasis tuleb nimi "Orders"
public class Order {  //PSQLException: ERROR: syntax error at or near "order"
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date created;

    @ManyToOne //personil võib olla mitu tellimust
    private Person person;

    @ManyToMany
    private List<Product> products;

    private double totalSum;

    //@Column(name = "totalSum")

    //Personil
    // @OneToMany
    // private  List<Address> address;
}
