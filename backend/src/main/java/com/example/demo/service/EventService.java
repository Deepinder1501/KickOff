package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // Save a new event
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Get event by ID
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    // Get events created by a specific user (creator)
    public List<Event> getEventsByCreatorId(Long creatorId) {
        return eventRepository.findByCreatorId(creatorId);
    }

    // Update an event
    public Event updateEvent(Long id, Event updatedEvent) {
        return eventRepository.findById(id).map(event -> {
            event.setEventName(updatedEvent.getEventName());
            event.setCity(updatedEvent.getCity());
            event.setState(updatedEvent.getState());
            event.setAddress(updatedEvent.getAddress());
            event.setSportType(updatedEvent.getSportType());
            event.setPlayersRequired(updatedEvent.getPlayersRequired());
            event.setPreferredGender(updatedEvent.getPreferredGender());
            event.setDate(updatedEvent.getDate());
            event.setTime(updatedEvent.getTime());
            event.setDescription(updatedEvent.getDescription());
            return eventRepository.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    // Delete an event
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new RuntimeException("Event not found");
        }
        eventRepository.deleteById(id);
    }

    // Join an event
    public Event joinEvent(Long eventId, String userEmail) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getParticipants() == null) {
            event.setParticipants(new ArrayList<>());
        }

        if (event.getParticipants().contains(userEmail)) {
            throw new RuntimeException("You already joined this event");
        }

        if (event.getPlayersRequired() <= 0) {
            throw new RuntimeException("Event is full");
        }

        event.getParticipants().add(userEmail);
        event.setPlayersRequired(event.getPlayersRequired() - 1);

        return eventRepository.save(event);
    }

    // Search & filter events
    public List<Event> searchEvents(String search, String sport, String gender,
                                    String city, String state, Integer minPlayers,
                                    Integer maxPlayers, String date, String sortBy) {

        List<Event> events = eventRepository.findAll();

        return events.stream()
                .filter(e -> search == null || search.isEmpty() ||
                        e.getEventName().toLowerCase().contains(search.toLowerCase()) ||
                        e.getCity().toLowerCase().contains(search.toLowerCase()) ||
                        e.getSportType().toLowerCase().contains(search.toLowerCase()))
                .filter(e -> sport == null || sport.isEmpty() || e.getSportType().equalsIgnoreCase(sport))
                .filter(e -> gender == null || gender.isEmpty() || e.getPreferredGender().equalsIgnoreCase(gender))
                .filter(e -> city == null || city.isEmpty() || e.getCity().equalsIgnoreCase(city))
                .filter(e -> state == null || state.isEmpty() || e.getState().equalsIgnoreCase(state))
                .filter(e -> minPlayers == null || e.getPlayersRequired() >= minPlayers)
                .filter(e -> maxPlayers == null || e.getPlayersRequired() <= maxPlayers)
                .filter(e -> date == null || date.isEmpty() || e.getDate().equals(date))
                .sorted(getComparator(sortBy))
                .collect(Collectors.toList());
    }

    // Comparator for sorting
    private Comparator<Event> getComparator(String sortBy) {
        if (sortBy == null) return Comparator.comparing(Event::getId);
        return switch (sortBy.toLowerCase()) {
            case "date" -> Comparator.comparing(Event::getDate);
            case "players" -> Comparator.comparing(Event::getPlayersRequired);
            case "name" -> Comparator.comparing(Event::getEventName, String.CASE_INSENSITIVE_ORDER);
            default -> Comparator.comparing(Event::getId);
        };
    }
}
