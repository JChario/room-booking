package com.acme.roombooking.service;

import com.acme.roombooking.model.MeetingRoomBooking;

import java.time.LocalDate;
import java.util.List;

public interface MeetingRoomBookingService {
    List<MeetingRoomBooking> findBookingsByRoomAndDate(String room, LocalDate date);
    MeetingRoomBooking createBooking(MeetingRoomBooking booking);
    void cancelBooking(Long bookingId);
    List<MeetingRoomBooking> findAllBookings();
}
