package com.acme.roombooking.controller;

import com.acme.roombooking.model.MeetingRoomBooking;
import com.acme.roombooking.service.MeetingRoomBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class MeetingRoomBookingController {

    @Autowired
    private MeetingRoomBookingService bookingService;

    @GetMapping
    public ResponseEntity<List<MeetingRoomBooking>> getBookingsByRoomAndDate(
            @RequestParam String room,
            @RequestParam String date) {
        LocalDate bookingDate = LocalDate.parse(date);
        List<MeetingRoomBooking> bookings = bookingService.findBookingsByRoomAndDate(room, bookingDate);
        return ResponseEntity.ok(bookings);
    }

    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody MeetingRoomBooking booking) {
        try {
            LocalTime startTime = booking.getTimeFrom();
            LocalTime endTime = booking.getTimeTo();

            long hours = Duration.between(startTime, endTime).toHours();
            if (hours < 1 || hours % 1 != 0) {
                throw new IllegalArgumentException("Bookings must be at least 1 hour and in consecutive multiples of 1 hour.");
            }

            bookingService.createBooking(booking);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        try {
            bookingService.cancelBooking(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<MeetingRoomBooking>> getAllBookings() {
        List<MeetingRoomBooking> bookings = bookingService.findAllBookings();
        return ResponseEntity.ok(bookings);
    }

}
