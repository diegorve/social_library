import psycopg2

print("psycopg2 cargado")

conn = psycopg2.connect(
    host="localhost",
    database="social_library",
    user="postgres",
    password="postgres"
)

print("conectado")