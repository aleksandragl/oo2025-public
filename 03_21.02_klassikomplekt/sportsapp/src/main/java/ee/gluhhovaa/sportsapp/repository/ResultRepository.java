package ee.gluhhovaa.sportsapp.repository;

import ee.gluhhovaa.sportsapp.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findBySportspersonId(Long sportspersonId); // saan tulemuste nimekirja sportlase ID-järgi
}
