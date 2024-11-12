// MeetingRoomBookingServiceImplTest.java
package com.acme.roombooking.service.impl;

import com.acme.roombooking.model.MeetingRoomBooking;
import com.acme.roombooking.model.MeetingRoom;
import com.acme.roombooking.repository.MeetingRoomBookingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MeetingRoomBookingServiceImplTest {

    @Mock
    private MeetingRoomBookingRepository bookingRepository;

    @InjectMocks
    private MeetingRoomBookingServiceImpl bookingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createBooking_noOverlap_savesBooking() {
        MeetingRoom room = new MeetingRoom();
        room.setId(1L);
        room.setName("Room A");

        MeetingRoomBooking booking = new MeetingRoomBooking();
        booking.setMeetingRoom(room);
        booking.setEmployeeEmail("test@example.com");
        booking.setDate(LocalDate.now().plusDays(1));
        booking.setTimeFrom(LocalTime.of(10, 0));
        booking.setTimeTo(LocalTime.of(11, 0));

        when(bookingRepository.findByMeetingRoomAndDate(room, booking.getDate())).thenReturn(Collections.emptyList());
        when(bookingRepository.save(booking)).thenReturn(booking);

        MeetingRoomBooking createdBooking = bookingService.createBooking(booking);

        assertNotNull(createdBooking);
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    void createBooking_overlap_throwsException() {
        MeetingRoom room = new MeetingRoom();
        room.setId(1L);
        room.setName("Room A");

        MeetingRoomBooking existingBooking = new MeetingRoomBooking();
        existingBooking.setMeetingRoom(room);
        existingBooking.setDate(LocalDate.now().plusDays(1));
        existingBooking.setTimeFrom(LocalTime.of(10, 0));
        existingBooking.setTimeTo(LocalTime.of(11, 0));

        MeetingRoomBooking newBooking = new MeetingRoomBooking();
        newBooking.setMeetingRoom(room);
        newBooking.setDate(LocalDate.now().plusDays(1));
        newBooking.setTimeFrom(LocalTime.of(10, 30));
        newBooking.setTimeTo(LocalTime.of(11, 30));

        when(bookingRepository.findByMeetingRoomAndDate(room, newBooking.getDate()))
                .thenReturn(Collections.singletonList(existingBooking));

        assertThrows(IllegalStateException.class, () -> bookingService.createBooking(newBooking));
    }

    @Test
    void cancelBooking_validBooking_deletesBooking() {
        MeetingRoom room = new MeetingRoom();
        room.setId(1L);
        room.setName("Room A");

        MeetingRoomBooking booking = new MeetingRoomBooking();
        booking.setId(1L);
        booking.setMeetingRoom(room);
        booking.setDate(LocalDate.now().plusDays(1));

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        bookingService.cancelBooking(1L);

        verify(bookingRepository, times(1)).deleteById(1L);
    }

    @Test
    void cancelBooking_pastBooking_throwsException() {
        MeetingRoom room = new MeetingRoom();
        room.setId(1L);
        room.setName("Room A");

        MeetingRoomBooking booking = new MeetingRoomBooking();
        booking.setId(1L);
        booking.setMeetingRoom(room);
        booking.setDate(LocalDate.now().minusDays(1));

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        IllegalStateException thrown = assertThrows(IllegalStateException.class, () -> bookingService.cancelBooking(1L));
        assertEquals("Cannot cancel a booking in the past.", thrown.getMessage());
    }

    @Test
    void cancelBooking_nonExistentBooking_throwsException() {
        when(bookingRepository.findById(1L)).thenReturn(Optional.empty());

        IllegalStateException thrown = assertThrows(IllegalStateException.class, () -> bookingService.cancelBooking(1L));
        assertEquals("Booking not found.", thrown.getMessage());
    }
}