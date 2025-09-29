package com.example.demo.controller;

import com.example.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5186"}) // allow frontend ports
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<?> sendContact(@RequestBody Map<String, String> body) {
        try {
            String firstName = body.get("firstName");
            String lastName = body.get("lastName");
            String email = body.get("email");
            String phone = body.get("phone");
            String message = body.get("message");

            if (firstName == null || email == null || message == null) {
                return ResponseEntity.badRequest().body("❌ Missing required fields");
            }

            emailService.sendContactEmail(firstName, lastName, email, phone, message);

            return ResponseEntity.ok("✅ Message sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("❌ Failed to send message: " + e.getMessage());
        }
    }
}
