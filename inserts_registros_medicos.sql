-- INSERTs para registros médicos
-- Estructura: id_registro, id_paciente, fecha, diagnosis, tratamiento

-- INSERT 1: Registro médico para paciente 1
INSERT INTO registros_medicos (id_paciente, fecha, diagnosis, tratamiento) 
VALUES (1, '2024-01-15', 'Hipertensión arterial leve. Presión sistólica 140-150 mmHg, diastólica 90-95 mmHg.', 'Lisinopril 10mg diario. Control de presión cada 3 días. Reducir consumo de sal.');

-- INSERT 2: Registro médico para paciente 2
INSERT INTO registros_medicos (id_paciente, fecha, diagnosis, tratamiento) 
VALUES (2, '2024-01-20', 'Diabetes tipo 2. Glucosa en ayunas 180 mg/dL, HbA1c 8.2%.', 'Metformina 500mg dos veces al día. Dieta baja en carbohidratos. Ejercicio moderado.');

-- INSERT 3: Registro médico para paciente 3
INSERT INTO registros_medicos (id_paciente, fecha, diagnosis, tratamiento) 
VALUES (3, '2024-01-25', 'Resfriado común con síntomas leves. Fiebre 37.8°C, congestión nasal.', 'Paracetamol 500mg cada 6 horas si hay fiebre. Descanso y abundante líquidos.');

-- INSERT 4: Registro médico para paciente 4
INSERT INTO registros_medicos (id_paciente, fecha, diagnosis, tratamiento) 
VALUES (4, '2024-02-01', 'Dolor lumbar crónico. Hernia discal L4-L5 confirmada por resonancia.', 'Ibuprofeno 400mg cada 8 horas. Fisioterapia 3 veces por semana. Evitar levantar peso.');

-- INSERT 5: Registro médico para paciente 5
INSERT INTO registros_medicos (id_paciente, fecha, diagnosis, tratamiento) 
VALUES (5, '2024-02-05', 'Ansiedad generalizada. Síntomas de estrés y dificultad para dormir.', 'Sertralina 50mg diario. Terapia cognitivo-conductual. Técnicas de relajación.');

-- INSERT 6: Registro médico para paciente 1 (seguimiento)
INSERT INTO registros_medicos (id_paciente, fecha, diagnosis, tratamiento) 
VALUES (1, '2024-02-10', 'Control de hipertensión. Presión mejorada: 130/85 mmHg.', 'Continuar con Lisinopril 10mg. Control mensual. Mantener dieta baja en sal.');

-- INSERT 7: Registro médico para paciente 2 (seguimiento)
INSERT INTO registros_medicos (id_paciente, fecha, diagnosis, tratamiento) 
VALUES (2, '2024-02-15', 'Control de diabetes. Glucosa en ayunas 140 mg/dL, HbA1c 7.1%.', 'Aumentar Metformina a 850mg dos veces al día. Continuar con dieta y ejercicio.');

-- INSERT 8: Registro médico para paciente 6
INSERT INTO registros_medicos (id_paciente, fecha, diagnosis, tratamiento) 
VALUES (6, '2024-02-20', 'Migraña crónica. Dolor intenso unilateral con náuseas.', 'Sumatriptán 50mg al inicio del dolor. Propranolol 40mg diario como preventivo.'); 