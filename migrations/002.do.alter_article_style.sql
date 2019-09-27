CREATE TYPE course_category AS ENUM (
  'Writing',
  'Film',
  'Politics',
  'Philosophy',
  'Pop Culture',
  'Teaching'
);

ALTER TABLE curricula_courses
  ADD COLUMN
    topic course_category;
