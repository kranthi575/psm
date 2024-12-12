package org.psm.config;

import lombok.RequiredArgsConstructor;
import org.psm.model.AppUser;
import org.psm.repository.AppUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private AppUserRepo appUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> appUser= appUserRepo.findByemail(username);
        System.out.println("User loaded :: AppUserDetailsService.class "+appUser.get().toString());
        if(appUser.isPresent()){
            List<GrantedAuthority> authorities=List.of(new SimpleGrantedAuthority(appUser.get().getUserid()));

            return new User(appUser.get().getEmail(),appUser.get().getPwd(),authorities);
        }else{
            throw new UsernameNotFoundException("User not found");
        }

    }

}
