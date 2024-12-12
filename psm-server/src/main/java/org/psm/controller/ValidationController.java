package org.psm.controller;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.psm.config.AppUserDetailsService;
import org.psm.jwt.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ValidationController {

    private final JwtTokenService jwtTokenService;
    private final ApplicationContext context;

    //write a method to validate the jwt token
    @GetMapping(value="/validateToken")
    public ResponseEntity<String> validateToken(HttpServletRequest request) {

        String jwttoken=request.getParameter("jwttoken");
        String username=request.getParameter("username");
        Boolean status=false;
        if(jwttoken!=null && !jwttoken.isEmpty() && !username.isEmpty()) {
            UserDetails userDetails = context.getBean(AppUserDetailsService.class).loadUserByUsername(username);

            status =  jwtTokenService.validateToken(jwttoken,userDetails);
           if(status==true) {
               return ResponseEntity.status(HttpStatus.OK).body("vallid token");
           }
           else {
               return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invallid token");
           }
        }


        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(" Token is empty");
    }

}
