ALTER TABLE curricula_courses
  ADD COLUMN
    author_id INTEGER REFERENCES curricula_users(id)
    ON DELETE SET NULL;