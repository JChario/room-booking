package com.acme.roombooking.repository;

import com.acme.roombooking.model.MeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Long> {
    Optional<MeetingRoom> findByName(String name);
}
