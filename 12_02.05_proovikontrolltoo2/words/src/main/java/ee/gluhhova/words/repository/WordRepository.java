package ee.gluhhova.words.repository;

import ee.gluhhova.words.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Long> {
    Page<Word> findAll(Pageable pageable); // pagineerimine ja soprteerimine
    List<Word> findByManagerId(Long managerId);
}