package hello.Repository;

import hello.Models.User;
import org.springframework.data.repository.CrudRepository;


import java.util.List;
import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {
    @Override
    List<User> findAll();

    Optional<User> findUserByEmail(String email);
    Optional<User> findUserByResetToken(String resetToken);



}
