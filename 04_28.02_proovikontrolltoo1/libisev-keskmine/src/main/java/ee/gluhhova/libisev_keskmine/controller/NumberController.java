package ee.gluhhova.libisev_keskmine.controller;


import ee.gluhhova.libisev_keskmine.entity.NumberEntity;
import ee.gluhhova.libisev_keskmine.repository.NumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController

public class NumberController {

    @Autowired
    private NumberRepository numberRepository;

    @GetMapping("/all") //võttame kõik numbrid,otspunkt kõikide arvude vaatamiseks.
    public List<NumberEntity> getAllNumbers() {
        return numberRepository.findAll();
    }
    @PostMapping("/add") // numbride lisamiseks andmebaasi
    public NumberEntity addNumber(@RequestBody NumberEntity number) {
        if (number.getValue() <= 0) {
            throw new RuntimeException("ERROR_NUMBER_MUST_BE_POSITIVE");
        }

        return numberRepository.save(number);
    }

    @GetMapping("/sum") // võtame numbrina kõikide andmebaasis numbrite summa
    public int getSum() {
        List<NumberEntity> numbers = numberRepository.findAll();
        int sum = 0;

        for (NumberEntity num : numbers) {
            sum += num.getValue();
        }

        return sum;
    }
    @GetMapping("/average")// see võtab kõikide andmebaasis olevate arvude aritmeetilise keskmise
    public double getAverage() {
        List<NumberEntity> numbers = numberRepository.findAll();

        if (numbers.isEmpty()) return 0.0;

        double sum = 0;
        for (NumberEntity num : numbers) {
            sum += num.getValue();
        }

        return sum / numbers.size();
    }
    @GetMapping("/max") // võtta kõige suurema numbri, mis andmebaasis leidub
    public int getMax() {
        List<NumberEntity> numbers = numberRepository.findAll();

        if (numbers.isEmpty()) return 0; // kontrollime kas on olemas numbrid

        int max = numbers.get(0).getValue(); // eeldame, et esimene number on suurim
        for (NumberEntity num : numbers) {
            if (num.getValue() > max) {
                max = num.getValue(); //uuendame vaartust
            }
        }

        return max;
    }
    @GetMapping("/movingaverage") //otspunkt andmebaasis olevate arvude libiseva keskmise leidmiseks
    public List<Double> getMovingAverage() {
        List<NumberEntity> numbers = numberRepository.findAll(); //võtame kõik numbrid

        if (numbers.size() < 3) {
            throw new RuntimeException("ERROR_NOT_ENOUGH_NUMBERS_FOR_MOVING_AVERAGE");
        }

        List<Double> movingAverages = new ArrayList<>();

        for (int i = 0; i < numbers.size() - 2; i++) { // käime numbrid läbi
            double avg = (numbers.get(i).getValue() + // võtame praeguse elemendi väärtuse
                    numbers.get(i + 1).getValue() + // võtame järgmise
                    numbers.get(i + 2).getValue()) / 3.0;
            movingAverages.add(avg); // lisame arvutatud keskmise listi
        }

        return movingAverages;
    }
}