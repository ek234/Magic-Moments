from pymongo import MongoClient
from PIL import Image
import io
import base64
import face_recognition

import yaml
dbLocation, dbName = '', ''
print('hi im python')
with open("db.yml", "r") as dbConfig:
    try:
        dbconf = yaml.safe_load(dbConfig)
        dbLocation = dbconf['url']
        dbName = dbconf['name']
    except yaml.YAMLError as exc:
        print(exc)
db = MongoClient(dbLocation)[dbName]
template = db['templates']
gallery = db['gallery']
image_tmp = db['images']

def addImages ( entries ):
    templateData = template.find()
    knownFaces = []
    knownIDs = []
    for temp in templateData :
        knownFaces.append(temp['face'])
        knownIDs.append(temp['_id'])
    for entry in entries :
        str64 = entry['img'].split(',')[1]
        strb = str64.encode('utf-8')
        bstr = base64.b64decode(strb)
        bfile = io.BytesIO(bstr)
        image = face_recognition.load_image_file(bfile)
        locations = face_recognition.face_locations(image)

        faces = []
        for loc in locations :
            top, right, bottom, left = loc
            # You can access the actual face itself like this:
            face_image = image[top:bottom, left:right]
            pil_image = Image.fromarray(face_image)

            imgByteArr = io.BytesIO()
            pil_image.save(imgByteArr, format="PNG")
            imgByteArr = imgByteArr.getvalue()
            faces.append( base64.b64encode(imgByteArr).decode('utf-8') )
        people = []
        for face in faces :
            strb = face.encode('utf-8')
            bstr = base64.b64decode(strb)
            bfile = io.BytesIO(bstr)
            image = face_recognition.load_image_file(bfile)
            face_encs = face_recognition.face_encodings(image)
            if len(face_encs) > 0:
                face_enc = face_encs[0]
                result = face_recognition.compare_faces(knownFaces, face_enc)
                try :
                    people.append(knownIDs[result.index(True)])
                except ValueError :
                    newTemplate = { 'face': face_enc.tolist(), 'image': face }
                    uid = template.insert_one(newTemplate).inserted_id
                    people.append(uid)
                    knownFaces.append(face_enc.tolist())
                    knownIDs.append(uid)
        entry['people'] = people
        gallery.insert_one(entry)

def clear():
    template.delete_many({})
    gallery.delete_many({})

if __name__ == '__main__':
    newBuckets = list(image_tmp.find())
    newEntries = []
    for bucket in newBuckets :
        for img in bucket['img'] :
            newEntries.append({
                'occasion': bucket['occasion'],
                'img': img,
                'tags': [bucket['venue']],
                'date': bucket['date'],
                'people': [],
            })
    addImages(newEntries)
    image_tmp.delete_many({})
