package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Send message to admin + confirmation to user
    public void sendContactEmail(String firstName, String lastName, String email, String phone, String message) {
        // 1. Send email to admin
        SimpleMailMessage adminMessage = new SimpleMailMessage();
        adminMessage.setTo("deepinder1501@gmail.com"); // your email
        adminMessage.setSubject("📩 New Contact Form Submission");
        adminMessage.setText(
                "You received a new contact form submission:\n\n" +
                        "Name: " + firstName + " " + lastName + "\n" +
                        "Email: " + email + "\n" +
                        "Phone: " + phone + "\n" +
                        "Message:\n" + message
        );
        mailSender.send(adminMessage);

        // 2. Send confirmation email to user
        SimpleMailMessage userMessage = new SimpleMailMessage();
        userMessage.setTo(email);
        userMessage.setSubject("✅ We received your message - KickOff Support");
        userMessage.setText(
                "Hello " + firstName + ",\n\n" +
                        "Thank you for contacting KickOff! We have received your message:\n\n" +
                        "\"" + message + "\"\n\n" +
                        "Our support team will get back to you shortly.\n\n" +
                        "Best Regards,\nKickOff Team"
        );
        mailSender.send(userMessage);
    }
}
