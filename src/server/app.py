"""
app.py
revision: 0.1 24.4.2014 initial by David Levy

Tornado server
"""

######################################################################
### imports
######################################################################
import os
import sys

#print (os.path.dirname(os.path.realpath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)),'..'))
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)),'..','..','..','ATE'))
#print (sys.path)
import tornado
import pymongo
from tornado import ioloop, web, websocket
from tornado.options import define, options



#from handlers.tf_list import TestFixtureList
from server.test_fixtures import TestFixtureManager
from server.handlers import TestFixtureHandler
from server.handlers import AdminUserHandler, \
    RunnerCache, RunnerHandler,StationHandler, LoginHandler,\
    FixtureHandler, AdminProductConfigHandler

from server.handlers.admin import AdminTestFixtureHandler, AdminStationHandler, \
    AdminBatchNumberHandler
######################################################################
### code
######################################################################
#DB_HOST = 'ate-mongo0:27017'


define("port", default=8880, help="run on the given port", type=int)
define("mongo_db_host",default='localhost:27017', help='Monogo Database Host', type=str)
define("mongo_db_name",default='ate-monitor', help='Database Name', type=str)
define("fixtures_status_update_interval",default=10000, help='fixtures status update interval in milliseconds', type=int)
define("redis_host",default='localhost', help='REDIS database host', type=str)
define("redis_port",default=6379, help='REDIS port', type=int)
define("redis_db",default=0, help='REDIS database', type=int)
define("batch_mongo_db_host",default='localhost:27017', help='Monogo Database for batch numbers', type=str)
define("batch_mongo_db_name",default='qs_test_shell_global', help='Database Name', type=str)
define("websocket_host",default='localhost', help='web socket host', type=str)
define("websocket_protocol",default='ws', help='web socket protocol ws or wss', type=str)
define("websocket_port",default=8880, help='web socket port', type=int)
define("notification_host",default='192.168.0.41:8889' , help='notification_host', type=str)


tornado.options.parse_config_file(
    os.path.join(os.path.dirname(os.path.realpath(__file__)),'settings.py'),
    False)
#if a local settings exists get information from settings
try:
    tornado.options.parse_config_file(
        os.path.join(os.path.dirname(os.path.realpath(__file__)),'local_settings.py'),
        False)
except Exception as e:
    #we just use the default settings
    print ('local settings: {}'.format(str(e)))

mongo_client = pymongo.MongoClient(options.mongo_db_host)
db = mongo_client[options.mongo_db_name]

batch_mongo_client = pymongo.MongoClient(options.batch_mongo_db_host)
batch_db = batch_mongo_client[options.batch_mongo_db_name]

class IndexHandler(web.RequestHandler):
    def get(self):
        if options.websocket_port:
            web_socket_url  = '{}://{}:{}/ws'.format(options.websocket_protocol,
                                                          options.websocket_host,
                                                          options.websocket_port)
        else:
            web_socket_url  = '{}://{}/ws'.format(options.websocket_protocol,
                                                          options.websocket_host)
        self.render("../templates/index.html",
                    web_socket_url=web_socket_url)


tf_cache = TestFixtureManager(db)
#runner_cache = RunnerCache(db)


class SocketHandler(websocket.WebSocketHandler):
    def open(self):
        print ('open')
        #print (self.request)
        station = self.get_argument('station',None)
        #TODO: get events and targets
        tf_cache.add_ws_client(self,station)


    def on_close(self):
        print ('close')
        tf_cache.remove_ws_client(self)


app = web.Application([
                          #admin
                          (r'/admin/test_fixture', AdminTestFixtureHandler, dict(db=db,tf_cache=tf_cache)),
                          (r'/admin/station', AdminStationHandler,dict(db=db, tf_cache=tf_cache)),
                          (r'/admin/batch_number', AdminBatchNumberHandler,dict(db=batch_db)),
                          (r'/', IndexHandler),
                          (r'/tf', TestFixtureHandler, dict(tf_cache=tf_cache)),
                          (r'/station', StationHandler, dict(db=db,tf_cache=tf_cache, notification_host=options.notification_host)),
                          (r'/fixture', FixtureHandler, dict(db=db)),
                          (r'/login', LoginHandler, dict(db=db)),
                          #(r'/runner', RunnerHandler, dict(runner_cache=runner_cache)),
                          (r'/users/admin', AdminUserHandler, dict(db=db)),
                          (r'/product_conf/admin', AdminProductConfigHandler, dict(db=db)),

                          (r'/ws', SocketHandler)

                      ],
                      static_path=os.path.join(os.path.dirname(__file__), '../client/'),
                      autoreload=True, cookie_secret="61oETzKXQAtaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo="
)

if __name__ == '__main__':

    #read settings from commandline
    tornado.options.parse_command_line()
    print ('server running on http://localhost:{}'.format(options.port))
    app.listen(options.port,xheaders=True)
    ioloop = ioloop.IOLoop.instance()
    update_cl_call_back = tornado.ioloop.PeriodicCallback(tf_cache.update_status,
                                                          options.fixtures_status_update_interval,
                                                          io_loop=ioloop)
    update_cl_call_back.start()
    ioloop.start()
