ALTER TABLE curricula_courses
  DROP COLUMN IF EXISTS author_id;

DROP TABLE IF EXISTS curricula_users CASCADE;
