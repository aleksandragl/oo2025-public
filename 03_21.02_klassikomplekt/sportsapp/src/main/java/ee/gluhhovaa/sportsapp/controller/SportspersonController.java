package ee.gluhhovaa.sportsapp.controller;


import ee.gluhhovaa.sportsapp.entity.Sportsperson;
import ee.gluhhovaa.sportsapp.repository.SportspersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SportspersonController {

    @Autowired
    SportspersonRepository sportspersonRepository;

    // localhost:8080/sportspersons
    @GetMapping("sportspersons")
    public List<Sportsperson> getAllSportspersons() {
        return sportspersonRepository.findAll(); // SELECT * FROM sportspersons
    }

    @PostMapping("sportspersons")
    public List<Sportsperson> addSportsperson(@RequestBody Sportsperson sportsperson) {
        if (sportsperson.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (sportsperson.getName() == null || sportsperson.getName().trim().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_CANNOT_BE_EMPTY");
        }
        if (sportsperson.getCountry() == null || sportsperson.getCountry().trim().isEmpty()) {
            throw new RuntimeException("ERROR_COUNTRY_CANNOT_BE_EMPTY");
        }
        if (sportsperson.getAge() <= 0) {
            throw new RuntimeException("ERROR_AGE_MUST_BE_POSITIVE");
        }
        sportspersonRepository.save(sportsperson);
        return sportspersonRepository.findAll();
    }

    @DeleteMapping("sportspersons/{id}")
    public List<Sportsperson> deleteSportsperson(@PathVariable Long id) {
        if (!sportspersonRepository.existsById(id)) {
            throw new RuntimeException("ERROR_SPORTSPERSON_NOT_FOUND");
        }
        sportspersonRepository.deleteById(id);
        return sportspersonRepository.findAll();
    }
    @PutMapping("sportspersons") // Sportlase andmete muutmine (PUT localhost:8080/sportspersons)
    public List<Sportsperson> editSportsperson(@RequestBody Sportsperson sportsperson) {
        if (sportsperson.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (sportsperson.getName() == null || sportsperson.getName().trim().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_CANNOT_BE_EMPTY");
        }
        if (sportsperson.getCountry() == null || sportsperson.getCountry().trim().isEmpty()) {
            throw new RuntimeException("ERROR_COUNTRY_CANNOT_BE_EMPTY");
        }
        if (sportsperson.getAge() <= 0) {
            throw new RuntimeException("ERROR_AGE_MUST_BE_POSITIVE");
        }
        sportspersonRepository.save(sportsperson);
        return sportspersonRepository.findAll();
    }
    @GetMapping("sportspersons/{id}")
    public Sportsperson getSportspersonById(@PathVariable Long id) {
        return sportspersonRepository.findById(id).orElseThrow();
    }
    @PatchMapping("sportspersons") // Muuda  ainult ühte sportlase väljakut (PATCH localhost:8080/sportspersons)
    public List<Sportsperson> editSportspersonField(@RequestParam Long id, @RequestParam String field, @RequestParam String value) {
        if (id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Sportsperson sportsperson = sportspersonRepository.findById(id).orElseThrow(() -> new RuntimeException("ERROR_SPORTSPERSON_NOT_FOUND"));

        switch (field) {
            case "name" -> {
                if (value.trim().isEmpty()) {
                    throw new RuntimeException("ERROR_NAME_CANNOT_BE_EMPTY");
                }
                sportsperson.setName(value);
            }
            case "country" -> {
                if (value.trim().isEmpty()) {
                    throw new RuntimeException("ERROR_COUNTRY_CANNOT_BE_EMPTY");
                }
                sportsperson.setCountry(value);
            }
            case "age" -> {
                int age = Integer.parseInt(value);
                if (age <= 0) {
                    throw new RuntimeException("ERROR_AGE_MUST_BE_POSITIVE");
                }
                sportsperson.setAge(age);
            }
            //default -> throw new RuntimeException("ERROR_INVALID_FIELD");
        }

        sportspersonRepository.save(sportsperson);
        return sportspersonRepository.findAll();
    }
    @GetMapping("sportspersons/{id}/totalpoints")  // võtta sportlase punktide kogusumma (GET localhost:8080/sportspersons/{id}/totalpoints)
    public int getTotalPoints(@PathVariable Long id) {
        Sportsperson sportsperson = sportspersonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ERROR_SPORTSPERSON_NOT_FOUND"));
        return sportsperson.getTotalPoints();
    }
    @GetMapping("sportspersons/with-points") // võtta kõik sportlased oma punktidega (GET localhost:8080/sportspersons/with-points)
    public List<Sportsperson> getAllSportspersonsWithPoints() {
        return sportspersonRepository.findAll();
    }
}