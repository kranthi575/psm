package org.psm.service;

import lombok.RequiredArgsConstructor;
import org.psm.model.FamilyGroup;
import org.psm.repository.FamilyGrpRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FamilyGroupService {

    private final FamilyGrpRepo familyGrpRepo;

    public FamilyGroup createFamilyGroup(FamilyGroup familyGroup){
        return familyGrpRepo.save(familyGroup);
    }

    public List<String> getAllExistingFamilyNames(){
        return familyGrpRepo.findAllByFamilyName();
    }

    public String getFamilyCid(String familyName) {
        return familyGrpRepo.getFamilyCidByFamilyName(familyName);
    }
}
