package com.plhrtr.bookingsystembackend.booking;


import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("bookings")
public class BookingController {
    BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @CrossOrigin
    @GetMapping("")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable int id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        if (booking.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "there is no booking with this id");
        }
        return booking.get();
    }

    @DeleteMapping("/{id}")
    public void deleteBookingById(@PathVariable int id) {
        if(!bookingRepository.deleteById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "id not found");
        }
    }

    @CrossOrigin
    @GetMapping("/day/{date}")
    public List<Booking> getBookingsByDate(@PathVariable LocalDate date) {
        return bookingRepository.findByDay(date);
    }

    @GetMapping("/roomNumber/{roomNumber}")
    public List<Booking> getBookingsByRoomNumber(@PathVariable int roomNumber) {
        return bookingRepository.findAllByRoomNumber(roomNumber);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/book")
    public void addBooking(@RequestBody Booking booking) {
        if(!bookingRepository.save(booking)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "invalid booking");
        }
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("/edit")
    public void updateBooking(@RequestBody Booking booking) {
        if(!bookingRepository.update(booking)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no booking with this id");
        }
    }

}
