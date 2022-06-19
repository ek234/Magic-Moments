from pymongo import MongoClient
import yaml
import base64
import io
import face_recognition
config = yaml.safe_load(open('database.yaml'))
client = MongoClient(config['uri'])
db = client['magicmoments']
template = db['template']
gallery = db['gallery']

def addImages ( files ):
    templateData = template.find()
    knownFaces = []
    knownIDs = []
    for temp in templateData :
        knownFaces.append(temp['face'])
        knownIDs.append(temp['_id'])
    for file_ in files :
        image = base64.b64decode(file_)
        persons = face_recognition.face_encodings(face_recognition.load_image_file(io.BytesIO(image)))
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
        gallery.insert_one({'image': image, 'people': people})

def clear():
    template.delete_many({})
    gallery.delete_many({})

if __name__ == '__main__':
    clear()
    imgs = ["/home/ek234/media/tests/4.jpg","/home/ek234/media/tests/5.jpg","/home/ek234/media/tests/6.jpg"]
    b = []
    for img in imgs :
        b.append( base64.b64encode(open(img,'rb').read()) )
    addImages(b)
