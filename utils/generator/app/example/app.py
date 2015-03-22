"""
Application templates


"""

import os
import sys
import tornado
from tornado.options import options
import pymongo

sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__))))
from tornado import ioloop, web
# Handling the configuration
import config
from handler_list import handler_list


app = web.Application(handler_list,
                      static_path=options.static_path,
                      autoreload=True,
                      cookie_secret=options.cookie_secret)

if __name__ == '__main__':
    print('$appname$ is running on http://localhost:{}/'.format(options.app_port))
    app.listen(options.app_port, xheaders=True)
    ioloop = ioloop.IOLoop.instance()
    tornado.autoreload.start()
    tornado.autoreload.watch('web/tester.html')

    ioloop.start()
