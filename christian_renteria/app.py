from flask import Flask, jsonify
import psycopg2  # Corrected import from psycop2 to psycopg2

app = Flask(__name__)

def get_data(year):
    conn = psycopg2.connect(
        dbname="alcohol_consumption",
        user="postgres",  # Replace with your username
        password="Posgres",  # Replace with your password
        host="localhost"
    )
    c = conn.cursor()
    c.execute('''
        SELECT state, beer, wine, spirits
        FROM consumption
        WHERE year = %s
    ''', (year,))
    data = c.fetchall()
    conn.close()
    return data

@app.route('/data/<int:year>', methods=['GET'])
def data(year):
    data = get_data(year)
    result = [{'state': row[0], 'beer': row[1], 'wine': row[2], 'spirits': row[3]} for row in data]
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)