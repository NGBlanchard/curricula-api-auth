CREATE TABLE curricula_comments (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    content TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    course_id INTEGER
        REFERENCES curricula_courses(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES curricula_users(id) ON DELETE CASCADE NOT NULL
);
