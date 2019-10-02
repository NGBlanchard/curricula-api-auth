CREATE TABLE curricula_courses (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    notes TEXT NOT NULL,
    readings TEXT NOT NULL,
    duration INTEGER NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL
);
