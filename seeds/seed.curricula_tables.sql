BEGIN;

TRUNCATE
  curricula_comments,
  curricula_courses,
  curricula_users
  RESTART IDENTITY CASCADE;

INSERT INTO curricula_users (user_name, password)
VALUES
  ('DeLillo', '$2a$12$tNRBcZmsYfIQjAORE6LsI.OxaPvIAswiBTSGGUqu9nnscevCP5/t2'),
  ('HowlingFantods', '$2a$12$JmL.a9lWts/F.r9OqPrn0.sf8N77UdUNEVlsSQWEqjC6lqZrexP8G'),
  ('AliSmith', '$2a$12$E/FLLgghsmt.5HKoYy0GbOH17PD5913uHPEuWlVIM1H5CJ00WFlYa'),
  ('Zadie', '$2a$12$TKhUJy1razGeEv6BO6iKneapzV2V99jzFW9CPVx/FGu620aDU/XWq'),
  ('JJoyce', '$2a$12$HND1cex0AnEb2OvW35cIee06Lu9k7Vyekc09VUdpr/tUYf5Xn.EhG'),
  ('Archimboldi', '$2a$12$VsD.W/HXu8ae0Wih8Vscr.CYSefcj2fCsByOBCxWp1UISXuZaaSV.');

INSERT INTO curricula_courses (title, description, notes, readings, duration, topic, author)
VALUES
  ('Fiction After the Fall', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'Geek Love, White Teeth, My Brilliant Friend, The Crying of Lot 49',
  '16', 'Writing', 1),
  ('Traveling While Pausing', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'Rusty Brown, GhostWorld, This American Life',
  '16', 'Writing', 2),
  ('Indiana as Universe', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'Four for a Quarter, Safety Patrol, Memoranda, Winesburg',
  '16', 'Writing', 3),
  ('The Body as Thought', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'Philosophy, The Noontime Demon, Illness as Metaphor',
  '32', 'Politics', 4),
  ('Baseball in Film', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'Pafko at the Wall, The Sportswriter, The Art of Fielding',
  '32', 'Film', 5),
  ('Artful Sentences', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'Verbs, Nouns, Adjectives, Adverbs, Interjections, Whatever',
  '16', 'Writing', 6),
  ('Jigsaw Method', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'Teaching as Literature, Ways of Reading, Woe is I, The Story of the Student',
  '16', 'Philosophy', 1),
  ('Debate Logic', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'YouTube links',
  '16', 'Politics', 2),
  ('The Fly and The Thing', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'Horror in Isolation, The Monsters Abound, A Study of Film History, Survey of Horror',
  '32', 'Film', 5),
  ( 'Cardi B and Crime', 'The second in a two-course sequence, English 102 introduces formal argumentation and college-level research methods, including synthesis of sources and citation formats. The course also reinforces and further develops the writing and reading skills learned in English 101',
  'Use in the classroom to discuss segmented narratives. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum)',
  'None',
  '32', 'Pop Culture', 4);

INSERT INTO curricula_comments (
  content,
  course_id,
  user_id
) VALUES
  (
    'It is so much simpler to bury reality than it is to dispose of dreams',
    1,
    2
  ),
  (
    'All plots tend to move deathward. This is the nature of plots.',
    1,
    3
  ),
  (
    'It is possible to be homesick for a place even when you are there.',
    1,
    4
  ),
  (
    'Writing is a concentrated form of thinking. I don’t know what I think about certain subjects, even today, until I sit down and try to write about them. Maybe I wanted to find more rigorous ways of thinking. We’re talking now about the earliest writing I did and about the power of language to counteract the wallow of late adolescence, to define things, define muddled experience in economical ways. Let’s not forget that writing is convenient. It requires the simplest tools. A young writer sees that with words and sentences on a piece of paper that costs less than a penny he can place himself more clearly in the world. Words on a page, that’s all it takes to help him separate himself from the forces around him, streets and people and pressures and feelings. He learns to think about these things, to ride his own sentences into new perceptions.!',
    1,
    5
  ),
  (
    'Stories are consoling, fiction is one of the consolation prizes for having lived in the world.',
    2,
    6
  ),
  (
    'Lifes single lesson: that there is more accident to it than a man can ever admit to in a lifetime and stay sane.',
    2,
    1
  ),
  (
    'If they can get you asking the wrong questions, they dont have to worry about answers.',
    2,
    3
  ),
  (
    'Its been a prevalent notion. Fallen sparks. Fragments of vessels broken at the Creation. And someday, somehow, before the end, a gathering back to home. A messenger from the Kingdom, arriving at the last moment. But I tell you there is no such message, no such home -- only the millions of last moments . . . nothing more. Our history is an aggregate of last moments.',
    4,
    6
  ),
  (
    'Tech companies transformation of individuals into data sets has effectively moneyballed the entirety of human social reality.',
    4,
    4
  ),
  (
    'Writers must oppose systems. Its important to write against power, corporations, the state, and the whole system of consumption and of debilitating entertainments... I think writers, by nature, must oppose things, oppose whatever power tries to impose on us.',
    10,
    3
  ),
  (
    'Never be deceived that the rich will allow you to vote away their wealth.',
    10,
    5
  ),
  (
    'This frail engine, we think, and yet what murder is needed to take it down.',
    7,
    1
  ),
  (
    'How can we imagine what our lives should be without the illumination of the lives of others?',
    7,
    2
  ),
  (
    'James Salter said I would like to fit your hand like a favorite soap, so there.',
    7,
    3
  ),
  (
    'The secret is to have the courage to live. If you have that, everything will sooner or later change',
    7,
    4
  ),
  (
    'The idea is to use your secret idiosyncratic strength, just exploit the hell out of it, make of it a life, a synthetic reality',
    9,
    6
  ),
  (
    'Testing testing 123',
    6,
    5
  ),
  (
    'Im looking for ideas on incorporating film into English instruction',
    6,
    1
  ),
  (
    'WOAH!!!!!',
    8,
    2
  ),
  (
    'Has anyone read the new Chris Ware?',
    8,
    4
  );

  COMMIT;


