__author__ = 'davidl'
"""
settings.py
"""
import os
from tornado.options import define

define("port", default=9915, help="port", type=int)
define("mongodb_host",default='localhost:27017', help='Monogo Database Host', type=str)
define("mongodb_name",default='mat', help='Database Name', type=str)
define("init_db",default=1, help='Initisalize database', type=int)
define("templates_dir",
       default=os.path.join(os.path.dirname(os.path.realpath(__file__)),'..','templates'),
       help='templates directory', type=str)
define("static_path",
       default=os.path.join(os.path.dirname(os.path.realpath(__file__)),'..','client'),
       help='static path', type=str)
define("mobile_version",default=1, help='start mobile version', type=int)
define("mobile_templates_dir",
       default=os.path.join(os.path.dirname(os.path.realpath(__file__)),'..','mobile','www'),
       help='mobile templates directory', type=str)
define("mobile_static_path",
       default=os.path.join(os.path.dirname(os.path.realpath(__file__)),'..','mobile','www'),
       help='mobile static path', type=str)
