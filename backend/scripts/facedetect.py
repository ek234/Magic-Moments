from pymongo import MongoClient
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
template = db['template']
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
        str64 = ""
        try :
            str64 = entry['img'].split(',')[1]
        except :
            print(entry)
        strb = str64.encode('utf-8')
        bstr = base64.b64decode(strb)
        bfile = io.BytesIO(bstr)
        persons = face_recognition.face_encodings(face_recognition.load_image_file(bfile))
        people = []
        for person in persons :
            result = face_recognition.compare_faces(knownFaces, person)
            print(result)
            try :
                people.append(knownIDs[result.index(True)])
            except ValueError :
                newTemplate = { 'face': person.tolist() }
                uid = template.insert_one(newTemplate).inserted_id
                people.append(uid)
                knownFaces.append(person.tolist())
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
        print(bucket)
        for img in bucket['img'] :
            print(img)
            newEntries.append({
                'occasion': bucket['occasion'],
                'img': img,
                'tags': [bucket['venue']],
                'date': bucket['date'],
                'people': [],
            })
    addImages(newEntries)
    image_tmp.delete_many({})
