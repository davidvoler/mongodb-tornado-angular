"""
app.py
revision: 0.1 24.4.2014 initial by David Levy

Tornado server for mongodb tornado angular
"""
import os
import sys
import tornado
import pymongo
from tornado.options import define, options
from tornado import ioloop, web

#adding local directory to path
sys.path.append(os.path.dirname(os.path.realpath(__file__)))

import settings

try:
    tornado.options.parse_config_file(
        os.path.join(os.path.dirname(os.path.realpath(__file__)),'local_settings.py'),
        False)
except Exception as e:
    #print ('local settings: {}'.format(str(e)))
    print ('local settings not defined, using default settings')

mongo_client = pymongo.MongoClient(options.mongodb_host)
db = mongo_client[options.mongodb_name]


class IndexHandler(web.RequestHandler):
    def get(self):
        self.render("../templates/index.html")

class ApiHandler(tornado.web.RequestHandler):
    def initialize(self, db):
        self._db = db

    def get(self):
        self.render("../templates/index.html")
app = tornado.web.Application([
                          (r'/', IndexHandler),
                          (r'/api', ApiHandler, dict(db=db))
                      ],
                      static_path=os.path.join(os.path.dirname(__file__), '../client/'),
                      autoreload=True
)

if __name__ == '__main__':
    #read settings from commandline
    options.parse_command_line()
    print ('server running on http://localhost:{}'.format(options.port))
    app.listen(options.port,xheaders=True)
    ioloop = tornado.ioloop.IOLoop.instance()
    ioloop.start()
