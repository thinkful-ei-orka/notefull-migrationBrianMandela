DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS notes;


CREATE TABLE lists (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    list_name TEXT NOT NULL
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    note_name TEXT NOT NULL,
    content TEXT NOT NULL,
    modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    list INTEGER REFERENCES lists(id) ON DELETE CASCADE  NOT NULL
);