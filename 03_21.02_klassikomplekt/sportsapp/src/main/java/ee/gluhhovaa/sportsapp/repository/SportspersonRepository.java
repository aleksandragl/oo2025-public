package ee.gluhhovaa.sportsapp.repository;


import ee.gluhhovaa.sportsapp.entity.Sportsperson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportspersonRepository extends JpaRepository<Sportsperson, Long> {
}
