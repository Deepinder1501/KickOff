package com.example.demo.repository;

import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    //  Custom search across multiple fields
    @Query("SELECT e FROM Event e WHERE " +
            "(:search IS NULL OR LOWER(e.eventName) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(e.city) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(e.state) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(e.sportType) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(e.address) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:sport IS NULL OR e.sportType = :sport) " +
            "AND (:gender IS NULL OR e.preferredGender = :gender) " +
            "AND (:city IS NULL OR e.city LIKE %:city%) " +
            "AND (:state IS NULL OR e.state LIKE %:state%) " +
            "AND (:minPlayers IS NULL OR e.playersRequired >= :minPlayers) " +
            "AND (:maxPlayers IS NULL OR e.playersRequired <= :maxPlayers) " +
            "AND (:date IS NULL OR e.date = :date)")
    List<Event> searchEvents(String search, String sport, String gender,
                             String city, String state, Integer minPlayers,
                             Integer maxPlayers, String date);
}
