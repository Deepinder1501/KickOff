package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EventService;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    // Add new event
    @PostMapping("/add")
    public ResponseEntity<?> addEvent(@RequestBody Event event,
                                      @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);
            User currentUser = userRepository.findByEmail(email);

            if (currentUser == null)
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "User not found"));

            event.setCreatorId(currentUser.getId());
            Event savedEvent = eventService.saveEvent(event);
            return ResponseEntity.ok(savedEvent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Update event
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id,
                                         @RequestBody Event updatedEvent,
                                         @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);
            User currentUser = userRepository.findByEmail(email);

            Event event = eventService.getEventById(id);

            if (currentUser == null || !currentUser.getId().equals(event.getCreatorId()))
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Only the creator can update this event"));

            Event savedEvent = eventService.updateEvent(id, updatedEvent);
            return ResponseEntity.ok(savedEvent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Delete event
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id,
                                         @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);
            User currentUser = userRepository.findByEmail(email);

            Event event = eventService.getEventById(id);

            if (currentUser == null ||
                    (!currentUser.getId().equals(event.getCreatorId()) && !"ROLE_ADMIN".equals(currentUser.getRole())))
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Only the creator or admin can delete this event"));

            eventService.deleteEvent(id);
            return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get all events
    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    // Get a single event
    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(eventService.getEventById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Join event
    @PostMapping("/{id}/join")
    public ResponseEntity<?> joinEvent(@PathVariable Long id,
                                       @RequestParam String userEmail) {
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

    // Get events created by current user
    @GetMapping("/my-events")
    public ResponseEntity<?> getMyEvents(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractEmail(token);
            User currentUser = userRepository.findByEmail(email);

            if (currentUser == null)
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "User not found"));

            List<Event> myEvents = eventService.getEventsByCreatorId(currentUser.getId());
            return ResponseEntity.ok(myEvents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
