// src/main/java/com/example/demo/controller/EventController.java
package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/add")
    public Event addEvent(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // Search + filters + sort
    @GetMapping("/search")
    public List<Event> searchEvents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sport,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) Integer minPlayers,
            @RequestParam(required = false) Integer maxPlayers,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String sortBy
    ) {
        return eventService.searchEvents(search, sport, gender, city, state, minPlayers, maxPlayers, date, sortBy);
    }

    // Join game
    @PostMapping("/{id}/join")
    public Event joinEvent(@PathVariable Long id) {
        return eventService.joinEvent(id);
    }
}
