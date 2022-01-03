USE digital_booking;
INSERT INTO roles (id, role_name) VALUES (1, "ROLE_ADMIN");
INSERT INTO roles (id, role_name) VALUES (2, "ROLE_USER");
INSERT INTO users (email, name, last_name, user_name, password, id_role, enabled) VALUES ("digitalbookingg7@gmail.com", "Michael", "Scott", "digitalbookingg7@gmail.com", "$2a$10$M9cXVojdY1GLGzlZh02zqOpOeOCc8qEx6g4A3MsbGhz0FnrfoVQGS", "ROLE_ADMIN", 1);