package org.psm.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.psm.model.AppUser;
import org.psm.repository.AppUserRepo;
import org.psm.repository.ProfilePictureRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ServiceController {

    private final AppUserRepo appUserRepo;
    private final ProfilePictureRepo profilePictureRepo;
    @GetMapping(value="/getUserData")
    public ResponseEntity<AppUser> getUserData(HttpServletRequest request, HttpServletResponse response){

        String username=request.getParameter("username");
        if(username!=null){
            Optional<AppUser> appUser=appUserRepo.findByemail(username);

            if(appUser.isPresent()){
                return ResponseEntity.ok(appUser.get());
            }else{
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.notFound().build();

    }

    //function to retrieve family groups of the particular user

    //function to retrieve family members of particular familyID
    //above method is implemented in AppUserController

    //retrieving user cid of profile picture
    @GetMapping("/getUserCid")
    public ResponseEntity<String> getFamilyCid(@RequestParam("username") String username){

        String cid=profilePictureRepo.getUserCid(username);
        return ResponseEntity.ok(cid);
    }


    

}
