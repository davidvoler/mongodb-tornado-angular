"""
Entry handler will query,get,add and delete entrys, that is documents of the entry collection
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
        slug = self.get_argument('slug', None)
        idx = int(self.get_argument('idx', None))
        print(slug,idx)

        blog = self._db['blog'].find_one({'slug':slug})
        self.write(dumps(blog['entries'][idx]))

    def post(self):
        """
        add a new entry
        """
        entry = loads(self.request.body.decode("utf-8"))
        if not entry['slug']:
            self.write(dumps({'status':-1,'error':'Blog slug is not defined'}))
            return
        blog = self._db['blog'].find_one({'slug':entry['slug']})
        try:
            blog['entries'].insert(0, entry)
        except:
            blog['entries'] =[]
            blog['entries'].insert(0, entry)
        blog = self._db['blog'].update({'slug':entry['slug']},blog)
        self.write(dumps({'status':0}))

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
