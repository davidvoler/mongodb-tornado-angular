__author__ = 'davidl'

handler_template = \
"""
from common.handlers.base_handler import BaseHandler
from bson.json_util import loads, dumps


class $ClassName$Handler(BaseHandler):

    def initialize(self, db, logger):
        self.db = db
        self.logger = logger
        self.collection = '$module_name$'

    def get(self):
        id = self.get_argument('id', None)
        ret = self.db[self.collection].find_one({'id':id})
        self.write(dumps({
            'status':0,
            'error':'',
            'debug':'',
            'data':ret,
        }))
"""

def create_handler(class_name, module_name):
    #ret = handler_template.format(class_name, module_name)

    ret = handler_template.replace('$ClassName$',class_name)
    ret = ret.replace('$module_name$',module_name)
    return ret
