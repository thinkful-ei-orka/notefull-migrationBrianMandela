BEGIN;

INSERT INTO lists (list_name)
    VALUES
        ('test_here'),
        ('test_there'),
        ('test_everywhere'),
        ('test_nowhere');

INSERT INTO notes (note_name, content, list)
    VALUES
        ('note one','content 1', 1),
        ('note two','content 1', 2),
        ('note three','content 1', 3),
        ('note four','content 1', 4),
        ('note five','content 1', 2),
        ('note six','content 1', 1),
        ('note seven','content 1', 4);

COMMIT;