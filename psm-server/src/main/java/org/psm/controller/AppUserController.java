package org.psm.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.psm.jwt.JwtTokenService;
import org.psm.model.AppUser;
import org.psm.model.LoginRequestDTO;
import org.psm.model.LoginResponseDTO;
import org.psm.model.ProfilePicture;
import org.psm.repository.AppUserRepo;
import org.psm.repository.DbUtils;
import org.psm.repository.ProfilePictureRepo;
import org.psm.service.PinataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AppUserController {


    //getting authentication manager object from security config
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final AppUserRepo appUserRepo;
    private final DbUtils dbUtils;
    private final PinataService pinataService;
    private final ProfilePictureRepo profilePictureRepo;


    @PostMapping(value="/appUserRegister")
    public ResponseEntity<AppUser> register(@RequestParam("profilePicture") MultipartFile file, HttpServletRequest request, HttpServletResponse response){

            //retriving user information and creating AppUserObj from the http request

        System.out.println("AppUserController::register");
            AppUser appUser = new AppUser();
            appUser.setUserid(request.getParameter("userid"));
            appUser.setEmail(request.getParameter("email"));
            appUser.setPwd("{noop}"+request.getParameter("password"));
            appUser.setFamilyid(request.getParameter("familyid"));
            appUser.setProfilename(request.getParameter("profilename"));
            appUser.setSignup_date(new Date(System.currentTimeMillis()));
            if(dbUtils.isUserPresent(request.getParameter("email")))
            {
                System.out.println("user already exists");
                return  new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        try {

            //uploading profile picture to pinata

            String cid = pinataService.uploadToPinata(file.getInputStream(), file.getOriginalFilename());
            if (cid == null) {
                return ResponseEntity.status(500).body(null);
            }else{
                ProfilePicture profilePicture = new ProfilePicture();
                profilePicture.setUser_cid(cid);
                profilePicture.setUserid(appUser.getUserid());
                profilePictureRepo.save(profilePicture);
                System.out.println("Profile picture saved!!");
            }
            AppUser appUser1 = appUserRepo.save(appUser);
            System.out.println("user : "+appUser1.getProfilename()+" registered successfully!!");

        }catch(Exception e){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(appUser);


    }

    @GetMapping(value = "/getFamilyIdUsers")
    public ResponseEntity<List<AppUser>> test(HttpServletRequest request,HttpServletResponse response){

        //reading family id from the request
        System.out.println("AppUserController::getfamilyIdUsers");

        String familyid = request.getParameter("familyid");

        //reading data from databse
        List<AppUser> appUsers = appUserRepo.findByfamilyid(familyid);

        if(appUsers!=null && appUsers.size()>0){
            //return ResponseEntity.status(HttpStatus.OK).body("Found family numbers!!"+appUsers.toString());
            return ResponseEntity.status(HttpStatus.OK).body(appUsers);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(appUsers);
    }

    @GetMapping(value = "/appUserLogin")
    public ResponseEntity<LoginResponseDTO> appUserLogin(LoginRequestDTO loginRequestDTO){

        //reading client details
        //creating authentication token form the user entered details
        Authentication authRequest= UsernamePasswordAuthenticationToken.unauthenticated(loginRequestDTO.username(),loginRequestDTO.password());
        System.out.println("api login request ....:: called"+authRequest);
        //created authentication token is passing to the authentication manager to authenticate token
        //passing to authentication manager to authenticate the request details
        try {
            Authentication authResponse = authenticationManager.authenticate(authRequest);

            if(authResponse!=null && authResponse.isAuthenticated()){
                    jwtTokenService.generateToken(authResponse.getName());
                    String jwtToken=jwtTokenService.getJwtToken();

                    //sending jwt token in respone to user
                return ResponseEntity.status(HttpStatus.OK).header("Authorization", "authorization")
                        .body(new LoginResponseDTO(HttpStatus.OK.getReasonPhrase(), jwtToken));
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("UnAuthorization", "Bad credentials")
                    .body(new LoginResponseDTO(HttpStatus.BAD_REQUEST.getReasonPhrase(), "No JWT Token"));
        }
        return ResponseEntity.status(HttpStatus.OK).header("UnAuthorization", "Invalid credentials")
                .body(new LoginResponseDTO(HttpStatus.BAD_REQUEST.getReasonPhrase(), "No JWT Token"));
    }



}
