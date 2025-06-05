package ir.hamgit.formbuilder.data.repository;

import ir.hamgit.formbuilder.dataModel.FormResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormResponseRepository extends JpaRepository<FormResponse, Long> {
    List<FormResponse> findByFormId(Long formId);
}

