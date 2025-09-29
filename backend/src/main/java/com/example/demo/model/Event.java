package com.example.demo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;
    private String city;
    private String state;
    private String address;
    private String sportType;
    private int playersRequired;
    private String preferredGender;
    private String date;
    private String time;
    private String description;

    @ElementCollection
    private List<String> participants = new ArrayList<>(); // ✅ Track joined users

    // Getters and Setters
    public Long getId() { return id; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getSportType() { return sportType; }
    public void setSportType(String sportType) { this.sportType = sportType; }

    public int getPlayersRequired() { return playersRequired; }
    public void setPlayersRequired(int playersRequired) { this.playersRequired = playersRequired; }

    public String getPreferredGender() { return preferredGender; }
    public void setPreferredGender(String preferredGender) { this.preferredGender = preferredGender; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getParticipants() { return participants; } // ✅ getter
    public void setParticipants(List<String> participants) { this.participants = participants; } // ✅ setter
}
