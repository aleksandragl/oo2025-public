package ee.gluhhova.words.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeId;
    private String type;
    private String description;
    @ManyToOne
    @JoinColumn(name = "manager_id")
    @JsonIgnoreProperties({"words"})
    private Manager manager;
}