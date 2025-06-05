package ir.hamgit.formbuilder.data.repository;

import ir.hamgit.formbuilder.dataModel.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
