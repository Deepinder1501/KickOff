package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EventService;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5186"})
public class EventController {

    private final EventService eventService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public EventController(EventService eventService, UserRepository userRepository, JwtUtil jwtUtil) {
        this.eventService = eventService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addEvent(@RequestBody Event event,
                                      @RequestHeader("Authorization") String authHeader) {
        try {
            // Only admins can add events (optional)
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);
            User currentUser = userRepository.findByEmail(email);

            if (currentUser == null || !"ROLE_ADMIN".equals(currentUser.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Only admins can add events"));
            }

            return ResponseEntity.ok(eventService.saveEvent(event));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id,
                                         @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);
            User currentUser = userRepository.findByEmail(email);

            if (currentUser == null || !"ROLE_ADMIN".equals(currentUser.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Only admins can delete events"));
            }

            eventService.deleteEvent(id);
            return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(eventService.getEventById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<?> joinEvent(@PathVariable Long id, @RequestParam String userEmail) {
        try {
            Event event = eventService.joinEvent(id, userEmail);
            return ResponseEntity.ok(Map.of(
                    "event", event,
                    "notification", "✅ You joined the event: " + event.getEventName()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
