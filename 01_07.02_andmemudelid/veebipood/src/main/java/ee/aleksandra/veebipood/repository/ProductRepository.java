package ee.aleksandra.veebipood.repository;

import ee.aleksandra.veebipood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
