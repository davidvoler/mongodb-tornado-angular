#!/usr/bin/python

import sys, getopt
import os

from templates.handler import create_handler
from templates.controller import create_controller
from templates.service import create_service
from templates.view import create_view


def camel_case(word):
    return ''.join(x.capitalize() or '_' for x in word.split('_'))


print(camel_case('some_module'))


def main(argv):
    # print (argv)
    module_name = argv[0]
    os.mkdir(module_name)
    class_name = camel_case(module_name)
    print ("module :{}, {}".format(class_name, module_name))

    h= (create_handler(class_name, module_name))
    f = open('{}/{}_handler.py'.format(module_name,module_name), 'w')
    f.write(h)
    f.close()

    c= (create_controller(class_name, module_name))
    f = open('{}/{}_controller.js'.format(module_name,module_name), 'w')
    f.write(c)
    f.close()


    s= (create_service(class_name, module_name))
    f = open('{}/{}_service.js'.format(module_name,module_name), 'w')
    f.write(s)
    f.close()


    v= (create_view(class_name, module_name))
    f = open('{}/{}.html'.format(module_name,module_name), 'w')
    f.write(v)
    f.close()





if __name__ == "__main__":
    main(sys.argv[1:])