package com.plhrtr.bookingsystembackend.booking;

import java.time.LocalDateTime;

public record Booking(
        Integer id,
        Integer room_number,
        LocalDateTime starting_point,
        LocalDateTime ending_point,
        String description) {
}
