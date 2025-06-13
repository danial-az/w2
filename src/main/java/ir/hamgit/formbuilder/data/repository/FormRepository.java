package ir.hamgit.formbuilder.data.repository;

import ir.hamgit.formbuilder.dataModel.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {
    List<Form> findByOwnerId(Long userId);
}
