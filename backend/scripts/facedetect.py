from pymongo import MongoClient
import io
import face_recognition
client = MongoClient('mongodb://localhost:27017/magicmoments')
db = client['magicmoments']
template = db['template']
gallery = db['gallery']
image_tmp = db['image']

def addImages ( entries ):
    templateData = template.find()
    knownFaces = []
    knownIDs = []
    for temp in templateData :
        knownFaces.append(temp['face'])
        knownIDs.append(temp['_id'])
    for entry in entries :
        persons = face_recognition.face_encodings(face_recognition.load_image_file(io.BytesIO(entry['img'])))
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
    imgs = list(image_tmp.find())
    newEntries = []
    for img in imgs :
        newEntries.append({
            'img': img['img'],
            'tags': [img['venue']],
            'date': img['date'],
            'people': [],
        })
    addImages(newEntries)
    image_tmp.delete_many({})
