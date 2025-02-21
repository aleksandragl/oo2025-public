package ee.aleksandra.veebipood.controller;

//Controller - päringute vastuvotmiseks(nii suhtleb frent edn back endiga)

import ee.aleksandra.veebipood.entity.Person;
import ee.aleksandra.veebipood.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    //front end peab saatma ID ja parooli

    @PostMapping("login")
    public boolean login(@RequestBody Person person) {
        if (person.getId() == null) { // ID on Long
            throw new RuntimeException("ERROR_ID_MISSING");
        }
        if (person.getPassword() == null || person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }
        Person dbPerson = personRepository.findById(person.getId()).orElseThrow();
        if (dbPerson.getPassword().equals(person.getPassword())) {
            return true;
        } else {
            return false;
        }
    }
    @PostMapping("signup")
    public List<Person> signup(@RequestBody Person person) {
        if (person.getEmail() == null || person.getEmail().isBlank()) {
            throw new RuntimeException("ERROR_EMAIL_MISSING");
        }
        if (person.getPassword() == null || person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }
        personRepository.save(person);
        return personRepository.findAll();
    }
}
