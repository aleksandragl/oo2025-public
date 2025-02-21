package ee.gluhhovaa.sportsapp.controller;

import ee.gluhhovaa.sportsapp.entity.Result;
import ee.gluhhovaa.sportsapp.repository.ResultRepository;
import ee.gluhhovaa.sportsapp.service.DecathlonCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/results")

public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private DecathlonCalculator calculator;

    @GetMapping
    public List<Result> getAll() {
        return resultRepository.findAll();
    }


    @PostMapping
    public Result addResult(@RequestBody Result result) {
        if (result.getEvent() == null || result.getEvent().isEmpty()) {
            throw new RuntimeException("ERROR_EVENT_CANNOT_BE_EMPTY");
        }
        if (result.getValue() <= 0) {
            throw new RuntimeException("ERROR_INVALID_RESULT_VALUE");
        }
        result.setPoints(calculator.calculatePoints(result.getEvent(), result.getValue()));
        return resultRepository.save(result);
    }
    @DeleteMapping("results/{id}")
    public List<Result> deleteResult(@PathVariable Long id) {
        resultRepository.deleteById(id);
        return resultRepository.findAll();
    }
    @PutMapping("results")
    public List<Result> editResult(@RequestBody Result result) {
        if (result.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (result.getEvent() == null || result.getEvent().trim().isEmpty()) {
            throw new RuntimeException("ERROR_EVENT_CANNOT_BE_EMPTY");
        }
        if (result.getValue() <= 0) {
            throw new RuntimeException("ERROR_INVALID_RESULT_VALUE");
        }
        result.setPoints(calculator.calculatePoints(result.getEvent(), result.getValue()));
        resultRepository.save(result);
        return resultRepository.findAll();
    }
    @PatchMapping("results")
    public List<Result> editResultField(@RequestParam Long id, @RequestParam String field, @RequestParam String value) {
        if (id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Result result = resultRepository.findById(id).orElseThrow(() -> new RuntimeException("ERROR_RESULT_NOT_FOUND"));

        switch (field) {
            case "event" -> {
                if (value.trim().isEmpty()) {
                    throw new RuntimeException("ERROR_EVENT_CANNOT_BE_EMPTY");
                }
                result.setEvent(value);
            }
            case "value" -> {
                double val = Double.parseDouble(value);
                if (val <= 0) {
                    throw new RuntimeException("ERROR_INVALID_RESULT_VALUE");
                }
                result.setValue(val);
                result.setPoints(calculator.calculatePoints(result.getEvent(), val));
            }
            //default -> throw new RuntimeException("ERROR_INVALID_FIELD");
        }

        resultRepository.save(result);
        return resultRepository.findAll();
    }
}