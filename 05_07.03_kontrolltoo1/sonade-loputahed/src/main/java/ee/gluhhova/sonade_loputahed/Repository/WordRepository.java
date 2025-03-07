package ee.gluhhova.sonade_loputahed.Repository; // repositori haldab sõna entiteeti

import ee.gluhhova.sonade_loputahed.Entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
}
