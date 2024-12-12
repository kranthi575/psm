package org.psm.repository;

import org.psm.model.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DbUtils {

    @Autowired
    AppUserRepo appUserRepo;

    public boolean isUserPresent(String username){

        Optional<AppUser> appUser=appUserRepo.findByemail(username);

        if(appUser.isPresent()){
            return true;
        }else{
        return false;}
    }


    //
}
