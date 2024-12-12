package org.psm.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

//helps to validate user detail services.
@Component
@RequiredArgsConstructor
public class AppUserAuthProvider implements AuthenticationProvider {

    private final AppUserDetailsService appUserDetailsService;
    private final PasswordEncoder passwordEncoder;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {


        //reading credentials entered by the client
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        //loading use details with username from database
        UserDetails user=appUserDetailsService.loadUserByUsername(username);

        //comparing userdetails password with the clients entered password using password encoder
        if(passwordEncoder.matches(password,user.getPassword())){

            return new UsernamePasswordAuthenticationToken(username,password,user.getAuthorities());
        }
        else{
            throw new BadCredentialsException("invalid password");
        }

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
