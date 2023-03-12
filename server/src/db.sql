CREATE TABLE "discordUser" (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    username VARCHAR(255)
);

CREATE TABLE "room" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    roomAdminId INTEGER NOT NULL,

    FOREIGN KEY (roomAdminId) REFERENCES "discordUser"(id)
);

CREATE TABLE "discordUserRooms" (
    userId INTEGER NOT NULL,
    roomId INTEGER NOT NULL,

    FOREIGN KEY (userId) REFERENCES "discordUser"(id),
    FOREIGN KEY (roomId) REFERENCES "room"(id)
);

CREATE TABLE "message" (
    id SERIAL PRIMARY KEY,
    message VARCHAR(255),
    userId INTEGER NOT NULL,
    roomId INTEGER NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT Now(),

    FOREIGN KEY (userId) REFERENCES "discordUser"(id),
    FOREIGN KEY (roomId) REFERENCES "room"(id)
);

INSERT INTO "discordUser" (uid, email, username) VALUES ($1, $2, $3);

INSERT INTO "room" (name, roomAdminId) VALUES ("room-1", 1);

INSERT INTO "message" (message, userId, roomId) VALUES ("Hi Server!", 1, "");

SELECT room.id, room.name, roomAdminId, array_agg(username) AS members FROM room 
LEFT JOIN "discordUserRooms" 
ON "discordUserRooms".roomId = room.id
LEFT JOIN "discordUser"
ON "discordUser".id = "discordUserRooms".userId
GROUP BY room.id;

SELECT room.id, room.name, roomAdminId, 
json_agg(json_build_object('id', "discordUser".id,'username', username)) AS members 
FROM room 
LEFT JOIN "discordUserRooms" 
ON "discordUserRooms".roomId = room.id
LEFT JOIN "discordUser"
ON "discordUser".id = "discordUserRooms".userId
GROUP BY room.id;
