package ee.aleksandra.veebipood.repository;

import ee.aleksandra.veebipood.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

//.find.All() --> List<Person>
//.save(Person)
//.findById(Long)
//.deleteById(Long)
public interface PersonRepository extends JpaRepository<Person, Long> {
}
