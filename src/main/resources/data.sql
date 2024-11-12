
INSERT INTO "MEETING_ROOM" (name) VALUES ('Main Conference Room');
INSERT INTO "MEETING_ROOM" (name) VALUES ('Small Meeting Room');
INSERT INTO "MEETING_ROOM" (name) VALUES ('Board Room');

INSERT INTO "MEETING_ROOM_BOOKING" (meeting_room_id, employee_email, date, time_from, time_to) VALUES (1, 'john.smith@acme.com', '2023-04-24', '11:30:00', '12:30:00');
INSERT INTO "MEETING_ROOM_BOOKING" (meeting_room_id, employee_email, date, time_from, time_to) VALUES (3, 'maria.brown@acme.com', '2023-04-24', '11:00:00', '11:30:00');