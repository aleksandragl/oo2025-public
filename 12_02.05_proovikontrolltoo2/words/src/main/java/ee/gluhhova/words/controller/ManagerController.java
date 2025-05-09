package ee.gluhhova.words.controller;

import ee.gluhhova.words.entity.Manager;
import ee.gluhhova.words.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ManagerController {

    @Autowired
    ManagerRepository managerRepository;

    @GetMapping("managers")
    public List<Manager> getManagers() {
        return managerRepository.findAll();
    }

    @PostMapping("managers")
    public List<Manager> addManager(@RequestBody Manager manager) {
        managerRepository.save(manager);
        return managerRepository.findAll();
    }
}
