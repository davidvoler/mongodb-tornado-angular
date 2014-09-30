"""
Blog handler will query,get,add and delete blogs, that is documents of the blog collection
"""
import tornado
from bson.objectid import ObjectId
from bson.json_util import dumps, loads

class BlogHandler(tornado.web.RequestHandler):
    def initialize(self, db):
        """
        Initializes the instance with a mongodn database instance
        :param db: an instance to pymongo database object
        """
        self._db = db

    def get(self):
        """
        loads a single blog entry

        """
        _id = self.username = self.get_argument('_id', '')
        blog = self._db['blog'].find_one({'_id':ObjectId(_id)})
        self.write(dumps(blog))

    def query(self):
        """
        loads a list of blog - using a query dict
        """
        qu = loads(self.request.body.decode("utf-8"))
        if qu:
            blogs = self._db['blog'].find(qu)
        else:
            #rturn all blog_entries
            blogs = self._db['blog'].find()
        self.write(dumps(blogs))
    
    def post(self):
        """
        add a new blog
        
        """
        blog = loads(self.request.body.decode("utf-8"))
        try:
            ret = self._db['blog'].insert(blog)
            self.write(dumps(ret))
        except Exception as e:
            self.write(dumps({'status':'error','error':str(e)}))

    def put(self):
        """
        edit an existing blog
        
        """
        argj = loads(self.request.body.decode("utf-8"))
        try:
            ret = self._db['blog'].update({'_id':ObjectId(argj['_id'])}, {"$set": argj}, upsert=False)
            self.write(dumps(ret))
        except Exception as e:
            self.write(dumps({'status':'error','error':str(e)}))

    def delete(self):
        """
        delete a blog
        """
        _id = self.get_argument('_id', False)
        try:
            ret = self.db['blog'].remove({'_id':ObjectId(_id)})
            self.write(dumps(ret))
        except Exception as e:
            self.write(dumps({'status':'error','error':str(e)}))
