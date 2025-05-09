package ee.gluhhova.words.repository;

import ee.gluhhova.words.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
}
