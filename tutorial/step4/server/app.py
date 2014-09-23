"""
app.py
revision: 0.1 24.4.2014 initial by David Levy
Step:1
Tornado server for mongodb tornado angular
"""
import tornado
import os
import pymongo

mongo_client = pymongo.MongoClient('localhost:27017')
db = mongo_client['mat']


from tornado import ioloop, web
class IndexHandler(web.RequestHandler):
    def get(self):
        self.render("../templates/index.html")




class BlogHandler(web.RequestHandler):
    def get(self):
        from bson.json_util import dumps
        self.write(dumps(db['blog'].find()))




app = tornado.web.Application([
                          (r'/', IndexHandler),
                          (r'/api/blog', BlogHandler),
                      ],
                      static_path=os.path.join(os.path.dirname(__file__), '..', 'client'),
                      autoreload=True
)

if __name__ == '__main__':
    port = 9915
    print('server running on http://localhost:{}'.format(port))
    app.listen(port)
    ioloop = ioloop.IOLoop.instance()
    ioloop.start()
