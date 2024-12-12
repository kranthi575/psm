package org.psm.jwt;



//this is JWT Token validation filter
//this will be called before the UsernamePassword authentication filter called
//if the jwt token is validated this will filter will inform to usernamepassword authentication filter that..
//..user is authenticated and no need to validated one more time



import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.psm.config.AppUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;

//first thing first to make class filter, it needs to extend on of the class with implements filter
//this filter execute only once for request
@Component
public class JwtValidationFilter extends OncePerRequestFilter {


        @Autowired
        private JwtTokenService jwtService;

        @Autowired
        ApplicationContext context;

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//  Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraWxsIiwiaWF0IjoxNzIzMTgzNzExLCJleHAiOjE3MjMxODM4MTl9.5nf7dRzKRiuGurN2B9dHh_M5xiu73ZzWPr6rbhOTTHs
            String authHeader = request.getHeader("Authorization");
            String token = null;
            String username = null;

            if (request.getRequestURI().startsWith("/appUserRegister")) {
                filterChain.doFilter(request, response);  // Continue the chain without invoking authentication
                return;
            }

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                try {
                    token = authHeader.substring(7);
                    username = jwtService.extractUserName(token);
                }
                catch (ExpiredJwtException e) {

                    throw new BadCredentialsException("JWT token expired!!");

                }


            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = context.getBean(AppUserDetailsService.class).loadUserByUsername(username);
                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource()
                            .buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            filterChain.doFilter(request, response);
        }






    }

