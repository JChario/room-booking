package com.acme.roombooking.controller;

import com.acme.roombooking.model.MeetingRoom;
import com.acme.roombooking.repository.MeetingRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/meetingRooms")
public class MeetingRoomController {

    @Autowired
    private MeetingRoomRepository meetingRoomRepository;

    @GetMapping
    public List<MeetingRoom> getAllMeetingRooms() {
        return meetingRoomRepository.findAll();
    }
}
