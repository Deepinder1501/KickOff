// src/main/java/com/example/demo/service/EventService.java
package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    //Search with filters and sorting
    public List<Event> searchEvents(String search, String sport, String gender,
                                    String city, String state, Integer minPlayers,
                                    Integer maxPlayers, String date, String sortBy) {
        List<Event> events = eventRepository.findAll();

        return events.stream()
                .filter(event -> search == null ||
                        event.getEventName().toLowerCase().contains(search.toLowerCase()) ||
                        event.getCity().toLowerCase().contains(search.toLowerCase()) ||
                        event.getSportType().toLowerCase().contains(search.toLowerCase()))
                .filter(event -> sport == null || sport.isEmpty() || event.getSportType().equalsIgnoreCase(sport))
                .filter(event -> gender == null || gender.isEmpty() || event.getPreferredGender().equalsIgnoreCase(gender))
                .filter(event -> city == null || city.isEmpty() || event.getCity().equalsIgnoreCase(city))
                .filter(event -> state == null || state.isEmpty() || event.getState().equalsIgnoreCase(state))
                .filter(event -> minPlayers == null || event.getPlayersRequired() >= minPlayers)
                .filter(event -> maxPlayers == null || event.getPlayersRequired() <= maxPlayers)
                .filter(event -> date == null || event.getDate().equals(date))
                .sorted(getComparator(sortBy))
                .collect(Collectors.toList());
    }

    // Sorting logic
    private Comparator<Event> getComparator(String sortBy) {
        if (sortBy == null) return Comparator.comparing(Event::getId); // default by ID
        return switch (sortBy.toLowerCase()) {
            case "date" -> Comparator.comparing(Event::getDate);
            case "players" -> Comparator.comparing(Event::getPlayersRequired);
            case "name" -> Comparator.comparing(Event::getEventName, String.CASE_INSENSITIVE_ORDER);
            default -> Comparator.comparing(Event::getId);
        };
    }

    //xxxJoin an event (reduce playersRequired)
    public Event joinEvent(Long eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event != null && event.getPlayersRequired() > 0) {
            event.setPlayersRequired(event.getPlayersRequired() - 1);
            return eventRepository.save(event);
        }
        return null;
    }
}
