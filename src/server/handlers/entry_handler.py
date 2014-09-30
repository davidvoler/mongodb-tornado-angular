"""
entry handler will query,get,add and delete entries, that is documents of the entry collection
"""
import tornado
from bson.objectid import ObjectId
from bson.json_util import dumps, loads

class EntryHandler(tornado.web.RequestHandler):
    def initialize(self, db):
        """
        Initializes the instance with a mongodn database instance
        :param db: an instance to pymongo database object
        """
        self._db = db

    def get(self):
        """
        loads a single entry entry

        """
        _id = self.username = self.get_argument('_id', '')
        entry = self._db['entry'].find_one({'_id':ObjectId(_id)})
        self.write(dumps(entry))

    def query(self):
        """
        loads a list of entry - using a query dict
        """
        qu = loads(self.request.body.decode("utf-8"))
        if qu:
            entries = self._db['entry'].find(qu)
        else:
            #rturn all entry_entries
            entries = self._db['entry'].find()
        self.write(dumps(entries))
    
    def post(self):
        """
        add a new entry
        
        """
        entry = loads(self.request.body.decode("utf-8"))
        try:
            ret = self._db['entry'].insert(entry)
            self.write(dumps(ret))
        except Exception as e:
            self.write(dumps({'status':'error','error':str(e)}))

    def put(self):
        """
        edit an existing entry
        
        """
        argj = loads(self.request.body.decode("utf-8"))
        try:
            ret = self._db['entry'].update({'_id':ObjectId(argj['_id'])}, {"$set": argj}, upsert=False)
            self.write(dumps(ret))
        except Exception as e:
            self.write(dumps({'status':'error','error':str(e)}))

    def delete(self):
        """
        delete a entry
        """
        _id = self.get_argument('_id', False)
        try:
            ret = self.db['entry'].remove({'_id':ObjectId(_id)})
            self.write(dumps(ret))
        except Exception as e:
            self.write(dumps({'status':'error','error':str(e)}))
