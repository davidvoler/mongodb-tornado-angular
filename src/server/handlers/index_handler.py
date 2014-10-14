"""
Simple Index Handler
"""
from tornado import web
import os
from tornado.options import options


class IndexHandler(web.RequestHandler):
    def get(self):
        """
        Loading the main page for the application
        As we are working in a single web page application it will be the only page to load
        """
        if options.mobile_version:
            index_path = os.path.join(options.mobile_templates_dir,'index.html')
        else:
            index_path = os.path.join(options.templates_dir,'index.html')
        self.render(index_path)
