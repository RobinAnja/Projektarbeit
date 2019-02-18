package hello.Repository;

import hello.Models.CreateTest;
import org.springframework.data.repository.CrudRepository;

public interface CreateTestRepository extends CrudRepository<CreateTest,Integer> {
}
