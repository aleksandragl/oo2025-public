package ee.gluhhovaa.sportsapp.repository;

import ee.gluhhovaa.sportsapp.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ResultRepository extends JpaRepository<Result, Long> {
}
