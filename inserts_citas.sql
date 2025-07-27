-- INSERTs para la tabla citas
-- Estructura: id_citas, id_doctor, id_paciente, fecha, hora, es_activa

-- INSERT 1: Cita activa
INSERT INTO citas (id_doctor, id_paciente, fecha, hora, es_activa) 
VALUES (1, 1, '2024-01-15', '09:00:00', 'activa');

-- INSERT 2: Cita activa
INSERT INTO citas (id_doctor, id_paciente, fecha, hora, es_activa) 
VALUES (1, 2, '2024-01-16', '10:30:00', 'activa');

-- INSERT 3: Cita terminada
INSERT INTO citas (id_doctor, id_paciente, fecha, hora, es_activa) 
VALUES (2, 3, '2024-01-10', '14:00:00', 'terminada');

-- INSERT 4: Cita activa
INSERT INTO citas (id_doctor, id_paciente, fecha, hora, es_activa) 
VALUES (2, 4, '2024-01-20', '11:00:00', 'activa');

-- INSERT 5: Cita terminada
INSERT INTO citas (id_doctor, id_paciente, fecha, hora, es_activa) 
VALUES (1, 5, '2024-01-12', '16:30:00', 'terminada');

-- INSERT 6: Cita activa
INSERT INTO citas (id_doctor, id_paciente, fecha, hora, es_activa) 
VALUES (2, 6, '2024-01-25', '08:00:00', 'activa');

-- INSERT 7: Cita activa
INSERT INTO citas (id_doctor, id_paciente, fecha, hora, es_activa) 
VALUES (1, 7, '2024-01-18', '15:00:00', 'activa');

-- INSERT 8: Cita terminada
INSERT INTO citas (id_doctor, id_paciente, fecha, hora, es_activa) 
VALUES (2, 8, '2024-01-08', '13:00:00', 'terminada'); 