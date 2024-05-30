package com.plhrtr.bookingsystembackend.booking;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Repository
public class BookingRepository {
    JdbcClient jdbcClient;
    public BookingRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Booking> findAll() {
        return jdbcClient.sql("SELECT * from booking")
                .query(Booking.class)
                .list();
    }

    public Optional<Booking> findById(int id) {
        return Optional.of(jdbcClient.sql("SELECT * from booking WHERE id =?")
                .param(id)
                .query(Booking.class)
                .single());
    }

    public boolean deleteById(int id) {
        var res = jdbcClient.sql("DELETE from booking WHERE id = ?")
                .param(id)
                .update();
        return res == 1;
    }

    public List<Booking> findAllByRoomNumber(int roomNumber) {
        List<Booking> bookings = jdbcClient.sql("SELECT * from booking WHERE room_number = ?")
                .param(roomNumber)
                .query(Booking.class)
                .list();
        bookings.sort(Comparator.comparing(Booking::starting_point));
        return bookings;
    }
    
    public List<Booking> findByDay(LocalDate date) {
        List<Booking> bookings = jdbcClient.sql("SELECT * from booking WHERE DATE(starting_point) = ?")
                .param(date)
                .query(Booking.class)
                .list();
        bookings.sort(Comparator.comparing(Booking::starting_point));
        return bookings;
    }
    
    public boolean save(Booking booking) {
        List<Booking> allBookings = findAll();
        if (booking.ending_point().isBefore(booking.starting_point())) {
            return false;
        }
        if(!booking.starting_point().toLocalDate().isEqual(booking.ending_point().toLocalDate())) {
            return false;
        }

        for(Booking existingBooking : allBookings) {
            if (isOverlapping(booking, existingBooking)) {
                return false;
            }
        }

        var res = jdbcClient.sql("INSERT INTO booking (room_number, starting_point, ending_point, description) VALUES(?,?,?,?)")
                .param(booking.room_number())
                .param(booking.starting_point())
                .param(booking.ending_point())
                .param(booking.description())
                .update();
        return res == 1;
    }

    //update existing booking in database
    public boolean update(Booking booking) {
        var res = jdbcClient.sql("UPDATE booking SET room_number=?, starting_point=?, ending_point=?, description=? WHERE id = ?")
                .param(booking.room_number())
                .param(booking.starting_point())
                .param(booking.ending_point())
                .param(booking.description())
                .param(booking.id())
                .update();
        return res == 1;
    }

    private boolean isOverlapping(Booking booking1, Booking booking2) {
        if (booking1.starting_point().isEqual(booking2.starting_point())
                || booking1.ending_point().isEqual(booking2.ending_point())
                || booking1.starting_point().isAfter(booking2.starting_point()) && booking1.starting_point().isBefore(booking2.ending_point())) {
            return true;
        }
       return booking1.ending_point().isBefore(booking2.ending_point()) && booking1.ending_point().isAfter(booking2.starting_point());


    }
}
