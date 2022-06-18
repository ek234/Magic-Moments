from pymongo import MongoClient
import yaml
import face_recognition
config = yaml.safe_load(open('database.yaml'))
client = MongoClient(config['uri'])
db = client['magicmoments']
template = db['template']
gallery = db['gallery']

def newImage( fileName ):
    persons = face_recognition.face_encodings(face_recognition.load_image_file(fileName))
    templateData = template.find()
    knownFaces = []
    knownIDs = []
    for temp in templateData :
        knownFaces.append(temp['face'])
        knownIDs.append(temp['_id'])
    people = []
    for person in persons :
        result = face_recognition.compare_faces(knownFaces, person)
        print(result)
        try :
            print("jj")
            people.append(knownIDs[result.index(True)])
        except ValueError :
            newTemplate = { 'face': person.tolist() }
            people.append(template.insert_one(newTemplate).inserted_id)
    gallery.insert_one({'name': fileName, 'people': people})

def clear():
    template.delete_many({})
    gallery.delete_many({})

if __name__ == '__main__':
    #clear()
    newImage("/home/ek234/media/tests/6.jpg")
