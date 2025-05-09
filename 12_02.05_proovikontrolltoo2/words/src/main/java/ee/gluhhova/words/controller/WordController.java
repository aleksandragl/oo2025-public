package ee.gluhhova.words.controller;

import ee.gluhhova.words.entity.Word;
import ee.gluhhova.words.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class WordController {

    @Autowired
    WordRepository wordRepository;

    @GetMapping("words")
    public Page<Word> getWords(Pageable pageable) {
        return wordRepository.findAll(pageable);
    }

    @GetMapping("words/{id}")
    public Word getWord(@PathVariable Long id) {
        return wordRepository.findById(id).orElseThrow();
    }

    @PostMapping("words")
    public List<Word> addWord(@RequestBody Word word) {
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    @PutMapping("words")
    public List<Word> editWord(@RequestBody Word word) {
        if (word.getTypeId() == null) {
            throw new RuntimeException("ID puudub");
        }
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    @DeleteMapping("words/{id}")
    public List<Word> deleteWord(@PathVariable Long id) {
        wordRepository.deleteById(id);
        return wordRepository.findAll();
    }
    @GetMapping("words/by-manager/{managerId}")
    public List<Word> getWordsByManager(@PathVariable Long managerId) {
        return wordRepository.findByManagerId(managerId);
    }
}
