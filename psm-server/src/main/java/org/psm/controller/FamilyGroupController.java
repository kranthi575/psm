package org.psm.controller;


import lombok.RequiredArgsConstructor;
import org.psm.model.FamilyGroup;
import org.psm.repository.FamilyGrpRepo;
import org.psm.service.FamilyGroupService;
import org.psm.service.PinataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class FamilyGroupController {


    private final FamilyGroupService familyGroupService;
    private final PinataService pinataService;
    //creating family group
    //from client side :: we will receive , familyId,familyName,familyDesc,signup_date


    @PostMapping("/createFamilyGroup")
    public ResponseEntity<Map<String, String>> createFamilyGroup(
                @RequestParam("familyName") String familyName,
                @RequestParam("familyDesc") String familyDesc,
                @RequestParam("file") MultipartFile file)
    {
        System.out.println("Createfamilyzgroup method is triggered");
            try {
                // Upload the profile picture to Pinata and get the CID

                String cid = pinataService.uploadToPinata(file.getInputStream(), file.getOriginalFilename());

                if (cid == null) {
                    return ResponseEntity.status(500).body(Map.of("error", "File upload failed"));
                }

                System.out.println("FamilyGroupController cid  :: "+cid);
                // Create FamilyGroup object and save to the database
                FamilyGroup familyGroup = new FamilyGroup();
                familyGroup.setFamilyName(familyName);
                familyGroup.setFamilyDesc(familyDesc);
                familyGroup.setSignup_date(new Date()); // Set current date as signup date
                familyGroup.setFamilyProfilePicCid(cid); // Set the CID returned from Pinata

                // Save the FamilyGroup (Assuming you have a service or repository for saving it)
               familyGroupService.createFamilyGroup(familyGroup);
                // Return success response
                System.out.println("No Error in familygroupcontroller");
                return ResponseEntity.ok(Map.of("familyId", familyGroup.getFamilyName(), "cid", cid));
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body(Map.of("error", "File processing error"));
            }
        }

     @GetMapping("/getAllExistingFamilyNames")
    public ResponseEntity<List<String>> getAllExistingFamilyIds(){

        return ResponseEntity.ok(familyGroupService.getAllExistingFamilyNames());
    }

    @GetMapping("/getFamilyCid")
    public ResponseEntity<String> getFamilyCid(@RequestParam("familyname") String familyName){

        String cid=familyGroupService.getFamilyCid(familyName);
        return ResponseEntity.ok(cid);
    }
}



