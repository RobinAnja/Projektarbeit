package hello.Repository;

import hello.Models.Subject;
import org.springframework.data.repository.CrudRepository;

public interface SubjectRepository  extends CrudRepository<Subject, Integer> {


}
