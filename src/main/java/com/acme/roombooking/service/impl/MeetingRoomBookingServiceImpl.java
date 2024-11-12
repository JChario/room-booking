package com.acme.roombooking.service.impl;

import com.acme.roombooking.model.MeetingRoom;
import com.acme.roombooking.model.MeetingRoomBooking;
import com.acme.roombooking.repository.MeetingRoomBookingRepository;
import com.acme.roombooking.repository.MeetingRoomRepository;
import com.acme.roombooking.service.MeetingRoomBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MeetingRoomBookingServiceImpl implements MeetingRoomBookingService {

    @Autowired
    private MeetingRoomBookingRepository bookingRepository;

    @Autowired
    private MeetingRoomRepository roomRepository;

    @Override
    public List<MeetingRoomBooking> findBookingsByRoomAndDate(String roomName, LocalDate date) {
        Optional<MeetingRoom> roomOptional = roomRepository.findByName(roomName);
        if (roomOptional.isEmpty()) {
            throw new IllegalStateException("Meeting room not found.");
        }
        MeetingRoom room = roomOptional.get();
        return bookingRepository.findByMeetingRoomAndDate(room, date);
    }

    @Override
    public MeetingRoomBooking createBooking(MeetingRoomBooking booking) {
        // Validate meeting room exists
        Optional<MeetingRoom> roomOptional = roomRepository.findById(booking.getMeetingRoom().getId());
        if (roomOptional.isEmpty()) {
            throw new IllegalStateException("Meeting room not found.");
        }

        // Set the actual meeting room entity from the repository to the booking to ensure proper relationship mapping
        booking.setMeetingRoom(roomOptional.get());

        // Check for overlaps
        List<MeetingRoomBooking> existingBookings = bookingRepository.findByMeetingRoomAndDate(booking.getMeetingRoom(), booking.getDate());
        for (MeetingRoomBooking existing : existingBookings) {
            // Check if the new booking overlaps with an existing one
            if (booking.getTimeFrom().isBefore(existing.getTimeTo()) && booking.getTimeTo().isAfter(existing.getTimeFrom())) {
                throw new IllegalStateException("Booking slot overlaps with an existing booking.");
            }
        }

        // If no overlap, save the booking
        return bookingRepository.save(booking);
    }


    @Override
    public void cancelBooking(Long bookingId) {
        Optional<MeetingRoomBooking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            if (booking.get().getDate().isBefore(LocalDate.now())) {
                throw new IllegalStateException("Cannot cancel a booking in the past.");
            }
            bookingRepository.deleteById(bookingId);
        } else {
            throw new IllegalStateException("Booking not found.");
        }
    }

    @Override
    public List<MeetingRoomBooking> findAllBookings() {
        return bookingRepository.findAll();
    }
}
