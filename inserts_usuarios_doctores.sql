-- INSERTs para usuarios doctores
-- Estructura: id_usuario, nombres, apellidos, email, cedula, contraseña, roles

-- INSERT 1: Doctor 1
INSERT INTO usuarios (nombres, apellidos, email, cedula, contraseña, roles) 
VALUES ('Dr. Carlos', 'Mendoza', 'carlos.mendoza@hospital.com', '123456', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL0mM1nN2oO3pP4qQ5rR6sS7tT8uU9vV0wW1xX2yY3zZ', 'doctor');

-- INSERT 2: Doctor 2
INSERT INTO usuarios (nombres, apellidos, email, cedula, contraseña, roles) 
VALUES ('Dra. Ana', 'García', 'ana.garcia@hospital.com', '654321', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL0mM1nN2oO3pP4qQ5rR6sS7tT8uU9vV0wW1xX2yY3zZ', 'doctor');

-- INSERT 3: Doctor 3
INSERT INTO usuarios (nombres, apellidos, email, cedula, contraseña, roles) 
VALUES ('Dr. Roberto', 'López', 'roberto.lopez@hospital.com', '789123', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL0mM1nN2oO3pP4qQ5rR6sS7tT8uU9vV0wW1xX2yY3zZ', 'doctor');

-- INSERT 4: Doctor 4
INSERT INTO usuarios (nombres, apellidos, email, cedula, contraseña, roles) 
VALUES ('Dra. María', 'Rodríguez', 'maria.rodriguez@hospital.com', '321654', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL0mM1nN2oO3pP4qQ5rR6sS7tT8uU9vV0wW1xX2yY3zZ', 'doctor'); 