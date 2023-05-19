import psycopg2
import json
import os

class DataBase:
    def __init__(self, filename = 'database.json') -> None:
        try:
            with open(os.path.join(os.path.dirname(__file__), filename)) as file:
                self.parameters = json.load(file)
            if 'postgresql' in self.parameters:
                self.connection = psycopg2.connect(**self.parameters['postgresql'])
            else:
                raise Exception("Database file configuration is incorrect")
        except (Exception, IOError, psycopg2.DatabaseError) as error:
            print(error)

    # def insert(self, data: dict) -> None:
    #     self.data = data
    #     cursor = self.connection.cursor()
    #     cursor.close()