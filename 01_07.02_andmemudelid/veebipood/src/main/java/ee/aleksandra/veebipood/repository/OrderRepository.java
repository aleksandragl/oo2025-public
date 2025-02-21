package ee.aleksandra.veebipood.repository;


import ee.aleksandra.veebipood.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
