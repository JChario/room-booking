package com.acme.roombooking.repository;

import com.acme.roombooking.model.MeetingRoom;
import com.acme.roombooking.model.MeetingRoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MeetingRoomBookingRepository extends JpaRepository<MeetingRoomBooking, Long> {
    List<MeetingRoomBooking> findByMeetingRoomAndDate(MeetingRoom meetingRoom, LocalDate date);
}
