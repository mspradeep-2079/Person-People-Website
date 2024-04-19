from fastapi import FastAPI,status
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel


app = FastAPI()


app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_credentials=True,
                   allow_methods=["GET","POST"],
                   allow_headers=["*"])

# Creating Person Class and People Class

class Person:
  def __init__(self,name,address,age):
    self.name=name
    self.address=address
    self.age=age

class People:
  def __init__(self):
    self.PeopleList=[]
  def addPerson(self,item:Person):
    self.PeopleList.append(item)
  def printPerson(self):
    for i in self.PeopleList:
      print("Name:{}, Address:{}, Age:{}".format(i.name,i.address,i.age))
  def StartsWith(self,value):
    for i in self.PeopleList:
      if i.name.startswith(value):
        print("Name:{}, Address:{}, Age:{}".format(i.name,i.address,i.age))
        
  def returnPerson(self):
    return self.PeopleList


# Api Model and APi call
class GettingData(BaseModel):
  FirstName:str
  Address:str
  Age:int
  
  
@app.post("/sendData/" ,status_code=status.HTTP_201_CREATED)
async def sendData(data:GettingData):
  new_person = Person(data.FirstName,data.Address,data.Age)
  Community = People()
  Community.addPerson(new_person)
  
  return Community.returnPerson()


  


  