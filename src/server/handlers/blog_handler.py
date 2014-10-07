"""
Blog handler will query,get,add and delete blogs, that is documents of the blog collection
"""
import tornado
from bson.objectid import ObjectId
from bson.json_util import dumps, loads
from slugify import slugify

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
        slug = self.get_argument('slug', None)
        print (slug)
        if slug:
            blog = self._db['blog'].find_one({'slug':slug})
            print (blog)
            self.write(dumps(blog))
        else:
            blogs = self._db['blog'].find()
            self.write(dumps(blogs))

    
    def post(self):
        """
        add a new blog
        
        """
        blog = loads(self.request.body.decode("utf-8"))
        if not blog['name']:
            self.write(dumps({'status':-1,'error':'name is mandatory'}))
            return
        #create a slug for the blog
        slug = slugify(blog['name'])
        #make sure slug in unique in blog collection
        # the following request will return all slug in the collection
        blog_slugs = self._db['blog'].distinct('slug')

        nslug = slug
        i=0
        while nslug in blog_slugs:
            nslug = '{}-{}'.format(slug, i)
            i+=1
        blog['slug']=nslug
        try:
            self._db['blog'].insert(blog)
            self.write({'status':0,'error':'','slug':blog['slug']})
        except Exception as e:
            self.write(dumps({'status':-2,'error':str(e)}))

    def put(self):
        """
        updates an existing blog
        
        """
        blog = loads(self.request.body.decode("utf-8"))
        try:
            ret = self._db['blog'].update({'_id':ObjectId(blog['_id'])}, {"$set": blog}, upsert=False)
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
