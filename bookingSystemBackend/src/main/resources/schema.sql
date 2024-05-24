CREATE TABLE IF NOT EXISTS booking (
    id SERIAL ,
    room_number INT not null ,
    starting_point TIMESTAMP not null ,
    ending_point TIMESTAMP not null ,
    description VARCHAR(250),
    PRIMARY KEY(id)
);