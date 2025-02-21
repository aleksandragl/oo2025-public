package ee.aleksandra.veebipood.repository;

import ee.aleksandra.veebipood.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
