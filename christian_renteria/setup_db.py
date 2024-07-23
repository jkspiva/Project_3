import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('alcohol_consumption.db')
c = conn.cursor()

# Create a table
c.execute('''
    CREATE TABLE IF NOT EXISTS consumption (
        id INTEGER PRIMARY KEY,
        state TEXT NOT NULL,
        year INTEGER NOT NULL,
        beer REAL NOT NULL,
        wine REAL NOT NULL,
        spirits REAL NOT NULL
    )
''')

# Insert some example data
data = [
    ('California', 2020, 1.5, 0.5, 0.7),
    ('New York', 2020, 1.3, 0.4, 0.6),
    # Add more data here...
]

c.executemany('''
    INSERT INTO consumption (state, year, beer, wine, spirits)
    VALUES (?, ?, ?, ?, ?)
''', data)

conn.commit()



