package ee.aleksandra.veebipood.controller;

import ee.aleksandra.veebipood.entity.Category;
import ee.aleksandra.veebipood.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;


    @GetMapping("categories")
    public List<Category> getProducts() {
        return categoryRepository.findAll(); // [] -> SELECT * FROM extends JpaRepository<Product>
    }

    @PostMapping("categories")
    public List<Category> addProduct(@RequestBody Category category) {
        if (category.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }

    @DeleteMapping("categories/{id}")
    public List<Category> deleteProduct(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return categoryRepository.findAll();
    }
}
