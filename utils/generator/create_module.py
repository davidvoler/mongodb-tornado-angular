"""
Creates application skeleton



"""
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
    print (argv)






if __name__ == "__main__":
    main(sys.argv[1:])