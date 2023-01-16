package com.apolloeatsapi.ApolloEats.Controller;


import com.apolloeatsapi.ApolloEats.Controller.Class.AuthenticationRequest;
import com.apolloeatsapi.ApolloEats.Controller.Class.AuthenticationResponse;
import com.apolloeatsapi.ApolloEats.Controller.Class.AuthenticationService;
import com.apolloeatsapi.ApolloEats.Controller.Class.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(value="http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService service;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }
}
