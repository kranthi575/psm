package org.psm.repository;


import org.psm.model.Post;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

@EnableJdbcRepositories
public interface PostsRepo extends CrudRepository<Post, Long> {

    List<Post> findBypostfamily(String familyId);

}
