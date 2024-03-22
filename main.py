from flask import Flask, request, render_template, Response, flash, jsonify
import requests
import base64
from tinydb import TinyDB, Query
import random
import os
import feedparser
import secrets
from flask_cors import CORS

print("NALAGAM NOVICE")
novice = []
db = TinyDB('imagesDijaki.json')
app = Flask('app')
CORS(app, origins='*')
app.secret_key = '34343434343434'
api = "c76d66d59152262ed2309c820b100c0c"


def getNews():
  global novice
  input_news = [
      "https://img.rtvslo.si/feeds/06.xml",
      "https://img.rtvslo.si/feeds/09.xml",
      "https://img.rtvslo.si/feeds/03.xml"
  ]

  for i in input_news:
    data = feedparser.parse(input_news[0])
    for d in data["entries"]:
      tmp_data = {
          "title": d["title"],
          "summary": d["summary"],
          "img": d["links"][1]["href"],
          "date": d["published"].split("+")[0],
      }
      novice.append(tmp_data)
      tmp_data = {}


def randomNews():
  return random.choice(novice)


getNews()


@app.route('/')
def hello_world():
  return render_template("index.html")


#route for getting non checked images in db
@app.route('/unchecked_images')
def get_images():
  #tinydb query elements where checked = False
  unchecked_images = db.search(Query().checked == False)
  return render_template("check.html", uncheked=unchecked_images)


# app route that just calls getNews


@app.route('/refreshNews')
def refresh():
  getNews()
  return Response(status=204)


@app.route('/getOneNews')
def oneNews():
  return randomNews()


@app.route('/upload')
def upload():
  # get image froum route
  return render_template('upload.html')


# app route to get uploaded file
@app.route('/upload', methods=['POST'])
def upload_file():
  # get file from request
  file = request.files['file']
  # save file to disk
  file.save(f"uploads/" + str(file.filename))
  payloads = {
      "key":
      api,
      "image":
      base64.b64encode(open(f"uploads/" + str(file.filename), "rb").read()),
      "name":
      "SCKRupload"
  }
  up = requests.post("https://api.imgbb.com/1/upload", data=payloads).json()

  db.insert({
      "ID": secrets.token_urlsafe(),
      "link": up["data"]["url"],
      "checked": False
  })
  # delete img
  os.remove(f"uploads/" + str(file.filename))
  #print(up)

  # return success message
  return 'File uploaded successfully'


# route for getImg
@app.route('/getImg')
def getImg():
  # get random link from db
  # get len of db.all()

  checked_images = db.search(Query().checked == True)
  x = len(checked_images)
  y = random.randint(0, x)
  link = checked_images[y - 1]["link"]
  #print(db.all()[y - 1])
  return jsonify({"link":link})


# route to update img check status to True
@app.route('/updateImg')
def update():
  # get id from request
  id = request.args.get('id')
  # update db with id
  db.update({'checked': True}, Query().ID == id)

  return Response(status=204)


# route to delete img
@app.route('/deleteImg')
def delete():
  # get id from request
  id = request.args.get('id')
  # delete img from db
  db.remove(Query().ID == id)
  return Response(status=204)


app.run(host='0.0.0.0', port=8080, debug=True)
