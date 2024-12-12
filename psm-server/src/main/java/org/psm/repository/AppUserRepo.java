package org.psm.repository;

import org.psm.model.AppUser;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

@EnableJdbcRepositories
public interface AppUserRepo extends CrudRepository<AppUser, String> {
    Optional<AppUser> findByemail(String email);

    List<AppUser> findByfamilyid(String familyid);

    AppUser findByUserid(String userId);

}
