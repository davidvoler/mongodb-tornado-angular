__author__ = 'davidl'
"""
settings.py
default configuration file

To change default configuration:
use commandline - python app.py --port=3344
or copy this file as local_settings.py and change the settings there
"""
from tornado.options import define
define("port", default=9915, help="port", type=int)
define("mongodb_host",default='localhost:27017', help='Monogo Database Host', type=str)
define("mongodb_name",default='mat', help='Database Name', type=str)