package ee.gluhhova.sonade_loputahed.Controller;


import ee.gluhhova.sonade_loputahed.Entity.ReversedWord;
import ee.gluhhova.sonade_loputahed.Entity.Word;
import ee.gluhhova.sonade_loputahed.Repository.ReversedWordRepository;
import ee.gluhhova.sonade_loputahed.Repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController

public class WordController {
    @Autowired
    private WordRepository wordRepository; //Repository seo Controlleriga @Autowired abil.

    @Autowired
    private ReversedWordRepository reversedWordRepository;
    // Tee üks API otspunkt sõna lisamiseks andmebaasi
    //Kui lisad ühe sõna esialgsesse tabelisse juurde ja seejärel keerad uuesti kolm korda tagurpidi, tekib 3x9 kirjet juurde.
    @PostMapping("/words")
    public List<Word> addWord(@RequestBody Word word) {
        // Kontrollime, kas sõnal on ID
        if (word.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }     // Kontrollime, kas sõna on tühi
        if (word.getWord() == null || word.getWord().trim().isEmpty()) {
            throw new RuntimeException("ERROR_WORD_CANNOT_BE_EMPTY");
        }

        wordRepository.save(word);

        List<Word> words = wordRepository.findAll();

        for (int i = 0; i < 3; i++) {
            for (Word currentWord : words) {
                // Pöörame sõna
                String reversedWord = new StringBuilder(currentWord.getWord()).reverse().toString();

                // Salvestame pööratud sõna (ilma duplikaatide kontrollita)
                ReversedWord reversedWordEntity = new ReversedWord();
                reversedWordEntity.setReversedWord(reversedWord);
                reversedWordRepository.save(reversedWordEntity);
            }
        }
        return wordRepository.findAll();
    }


    @GetMapping("/words")
    public List<Word> getAllWords() {
        // võtame kõik sõnad -->teine API otspunkt kõikide sõnade vaatamiseks.
        return wordRepository.findAll();
    }
    //Loo API otspunkt, mis väljastab kõik sõnade lõputähed
    @GetMapping("/words/ends")
    public List<String> getWordEnds() {
        List<String> ends = new ArrayList<>(); //array selleks  et salvestada kõikide sõnade lõputähed
        List<Word> words = wordRepository.findAll();

        for (Word word : words) {
            // Saame iga sõna viimase tähe
            if (word.getWord() != null && word.getWord().length() > 0) {
                ends.add(word.getWord().substring(word.getWord().length() - 1)); // annab iga sõna viimase tähe
            }
        }

        return ends;
    }
    //Tee teine API otspunkt, mis väljastab kõikide sõnade pikkused.
    @GetMapping("/words/lengths")
    public List<Integer> getWordLengths() {
        List<Integer> lengths = new ArrayList<>();
        List<Word> words = wordRepository.findAll();

        for (Word word : words) {
            if (word.getWord() != null) {
                lengths.add(word.getWord().length());
            }
        }

        return lengths;
    }

    // Tee kolmas API otspunkt, mis väljastab kõik sõnad tagurpidi.
    @GetMapping("/words/reversed")
    public List<String> getReversedWords() {
        // Tagastame kõik pööratud sõnad tabelist ReversedWord
        List<ReversedWord> reversedWords = reversedWordRepository.findAll();
        List<String> result = new ArrayList<>();

        for (ReversedWord reversedWord : reversedWords) {
            result.add(reversedWord.getReversedWord());
        }

        return result;
    }
    //Viimane ülesanne:
    //Leia, millist tähte on sõna lõpus kõige rohkem. Väljasta see.
    @GetMapping("/words/mostFrequentLastChar")
    public String getMostFrequentLastChar() {
        List<Word> words = wordRepository.findAll();

        char mostFrequentChar = ' '; // kõige sagedamini esinev täht
        int maxCount = 0; // see on tähtede arv, mis esinevad lõpus
        for (Word word : words) {
            if (word.getWord() != null && word.getWord().length() > 0) {
                char lastChar = word.getWord().charAt(word.getWord().length() - 1);
                if (Character.isLetter(lastChar)) { //kui sümbol on täht ss jätkame
                    int count = 0; // loendur-lugeda kui mitu korda see tähe lõpus esineb


                    for (Word checkWord : words) {
                        if (checkWord.getWord() != null && checkWord.getWord().length() > 0) {
                            if (checkWord.getWord().charAt(checkWord.getWord().length() - 1) == lastChar) {
                                count++;
                            }
                        }
                    }
                    if (count > maxCount) {
                        mostFrequentChar = lastChar;
                        maxCount = count;
                    }
                }
            }
        }

        // Tagastame kõige sagedamini esineva tähe ja selle esinemiskoguse
        return "kõige sagedamini esineva tähe: " + mostFrequentChar + " (" + maxCount + " korda)";
    }

}
