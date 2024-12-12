package org.psm.repository;

import org.psm.model.ProfilePicture;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilePictureRepo extends CrudRepository<ProfilePicture, String> {

    @Query("SELECT f.user_cid FROM ProfilePicture f WHERE f.userid = :username")
    String getUserCid(@Param("username") String username);
}
