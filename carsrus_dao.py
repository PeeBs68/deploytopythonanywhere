# DAO
# author: Phelim Barry

import mysql.connector
from config import config as cfg
class carsiteDAO:
    host =""
    user = ""
    password =""
    database =""

    connection = ""
    cursor =""

    def __init__(self): 
        self.host=cfg["host"]
        self.user=cfg["user"]
        self.password=cfg["password"]
        self.database=cfg["database"]
    
    def getCursor(self): 
        self.connection = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        )
        self.cursor = self.connection.cursor()
        return self.cursor
    
    def closeAll(self):
        self.connection.close()
        self.cursor.close()
    
    
    def getAll(self):
        cursor = self.getCursor()
        sql="select * from cars"
        cursor.execute(sql)
        result = cursor.fetchall()
        carlist = []
        for row in result:
            carlist.append(self.convertToDict(row))

        self.closeAll()
        return carlist

    def findByID(self, id):
        cursor = self.getCursor()
        sql="select * from cars where id = %s"
        values = (id,)
        cursor.execute(sql, values)
        result = cursor.fetchone()
        self.closeAll()
        return self.convertToDict(result)
    
    def create(self, cars):
        cursor = self.getCursor()
        sql="insert into cars (make, model, price, colour, kilometers, fun_factor) values (%s,%s,%s,%s,%s,%s)"
        values = (cars.get("make"), cars.get("model"), cars.get("price"), cars.get("colour"), cars.get("kilometers"), cars.get("fun_factor"))
        cursor.execute(sql, values )
        self.connection.commit()
        newid = cursor.lastrowid
        cars["id"] = newid
        self.closeAll()
        return cars


    def update(self, id,  cars):
        cursor = self.getCursor()
        sql="update cars set make = %s, model = %s, price = %s, colour = %s, kilometers = %s, fun_factor = %s where id = %s"
        values = (cars.get("make"), cars.get("model"), cars.get("price"), cars.get("colour"), cars.get("kilometers"), cars.get("fun_factor"), id)
        cursor.execute(sql, values)
        self.connection.commit()
        self.closeAll()
        return cars

    def delete(self, id):
        cursor = self.getCursor()
        sql="delete from cars where id = %s"
        values = (id,)
        cursor.execute(sql, values)
        self.connection.commit()
        self.closeAll
        print("delete done")
        return True


    def convertToDict(self,resultLine):
        car_Keys = ["id", "make", "model", "price", "colour", "kilometers", "fun_factor"]
        currentkey = 0
        car = {}
        for attrib in resultLine:
            car[car_Keys[currentkey]] = attrib
            currentkey = currentkey + 1 
        return car

carsiteDAO = carsiteDAO()
    