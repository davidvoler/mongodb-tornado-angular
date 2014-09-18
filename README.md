mongodb-tornado-angular (and ionicframework)
============================================
Inspired by mean stack, here is a python based stack, with tornado as a server.

This stack aims to achieve the following
* Document/JSON based database - Mongodb
* REST server - Tornado
* Single page web framework - Angular
* ~ Mobile solution - ionicsframework

I wanted to keep things as simple as possible,


Status
-------
The project is in a preliminary stage - any suggestion and contribution are welcomed.

Why not simply use mean stack?
-----------------------------
Simply because I much more comfortable with python for server development, it is a python alternative



Installation
============
if you do not have python installed and access to a mongodb database please refer to install software later

linux/mac

#Python2
#git clone
#cd mongodb-tornado-angular
#which python3
#virtualenv --distribute -p YOUR_PYTHON_PATH .
pip install -r requirements.txt


#Python2.x
#git clone
#cd mongodb-tornado-angular
#virtualenv  .
pip install -r requirements.txt

Windows
TBD:


Install software
================

Mongodb
-------
If you do not have access to a mongodb database you may install a local mongodb.

installation instructions on all platforms can be found here:

http://docs.mongodb.org/manual/installation/

If you are working on Windows or Mac - you will have to remember to start mongodb before running

On linux mongodb is installed as a service by default.


Python
------
I have decided to start with python3.x however python2.6 should work as well.

python installation instruction can be found here:

https://www.python.org/download


bower,node & npm
----------------
Bower & npm are used to install javascript package we do not do any node developments


