package org.psm.repository;


import org.psm.model.FamilyGroup;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FamilyGrpRepo extends CrudRepository<FamilyGroup, Long> {

    @Query("SELECT f.familyName FROM FamilyGroup f")
   List<String> findAllByFamilyName();


    @Query("SELECT f.familyProfilePicCid FROM FamilyGroup f WHERE f.familyName = :familyName")
    String getFamilyCidByFamilyName(@Param("familyName") String familyName);

}
