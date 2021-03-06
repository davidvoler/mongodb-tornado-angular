"""app.py
revision: 0.1 24.4.2014 initial by David Levy

Tornado server for mongodb tornado angular tutorial
"""
import os
import sys
import tornado
import pymongo
from tornado.options import  options
from tornado import ioloop, web

from handlers.blog_handler import BlogHandler
from handlers.entry_handler import EntryHandler
from handlers.index_handler import IndexHandler

#adding local directory to path
sys.path.append(os.path.dirname(os.path.realpath(__file__)))

"""
Loading default setting files
"""
import settings

"""
searching for a local_setting.py file that overrides default configuration
"""
try:
    tornado.options.parse_config_file(
        os.path.join(os.path.dirname(os.path.realpath(__file__)),'local_settings.py'),
        False)
except Exception as e:
    #print ('local settings: {}'.format(str(e)))
    #TODO: handle different exceptions
    print ('local_settings.py not defined, using default settings')

"""
Connecting to the mongodb database
"""
mongo_client = pymongo.MongoClient(options.mongodb_host)
db = mongo_client[options.mongodb_name]



def init_db(db):
    try:
        db.create_collection('blog')
    except:
        pass
    db['blog'].ensure_index('slug', unique=True)
    db['blog'].ensure_index('_id', unique=True)
    try:
        db.create_collection('user')
    except:
        pass
    try:
        db['user'].insert({'username':'admin','password':'admin','role':'admin'})
    except:
        pass
    db['user'].ensure_index('username', unique=True)
    db['user'].ensure_index('_id', unique=True)


if options.mobile_version:
    static_path = options.mobile_static_path
else:
    static_path = options.static_path

app = tornado.web.Application([
                          (r'/', IndexHandler),
                          #api prefix means that we load json data
                          (r'/api/blog', BlogHandler, dict(db=db)),
                          (r'/api/entry', EntryHandler, dict(db=db)),
                      ],
                      static_path=static_path,
                      autoreload=True
)

if __name__ == '__main__':
    #read settings from commandline
    options.parse_command_line()
    if options.init_db:
        init_db(db)
    print ('server running on http://localhost:{}'.format(options.port))
    app.listen(options.port,xheaders=True)
    ioloop = tornado.ioloop.IOLoop.instance()
    ioloop.start()
