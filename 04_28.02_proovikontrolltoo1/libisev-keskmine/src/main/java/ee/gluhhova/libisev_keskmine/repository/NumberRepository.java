package ee.gluhhova.libisev_keskmine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ee.gluhhova.libisev_keskmine.entity.NumberEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface NumberRepository extends JpaRepository<NumberEntity, Long> {
}
