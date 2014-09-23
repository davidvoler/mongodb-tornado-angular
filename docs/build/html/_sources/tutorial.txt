Tutorial
========

In this tutorial we are going to learn how use the mongodb-tronado-angualr framework

To get started with the please clone the project and checkout you corrent step

.. code-block:: bash

    $ git clone https://github.com/davidvoler/mongodb-tornado-angular.git

.. code-block:: bash

    $ cd mongodb-tornado-angular/tutorial


Step 1 - basic tornado application
----------------------------------
In this step you are going to create a basic tornado application, We load the index.html from templates directory.

.. code-block:: bash

    cd step1/server
    python app.py


Step 2 - look and feel - bootstrap
----------------------------------
To improve our look and feel lets add bootstrap.
for more information about bootstrap http://getbootstrap.com/

.. code-block:: bash

    cd step2/server
    python app.py

We are loding bootstrap css file from maxcdn
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
The syntax href=// will load the right protocol - http or https.

We have created simple bootstrap style menu and used the container and jumbotron css class

Tasks
1. Add some more bootsrap components
# alert
# well
# forms and form groups

1. Add a bootstrap modal window
http://getbootstrap.com/javascript/#modals


Step 3 - adding angular
-----------------------
#TODO - this step should be separated to 2 or more steps
Now it is time to add angualrjs

First lets add the angularjs code from CDN :
We add the angualrjs library code to the end of the body in the index.html

<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular.min.js"></script>

Lets create a new directory: client  where we are going to store our own javascript code and html partial files.
in the client directory we create 2 more directories
js - for javascript files
partials - for html snippets

In this step all our js code will reside in a single file
js/my_app.js



As our js is loaded locally - we need to load it from the tornado server. We can use the static_path parameter for tornado:

now after we have loaded angularjs code lets add our javascript file

<script src="/static/js/app.js"></script>


- explanation for the static syntax

static_path=os.path.join(os.path.dirname(__file__), '..', 'client'),

os.path.dirname(__file__) returns current directory
os.path.join  - makes sure that this will work on windows as well as on unix like system
on windows we will have to write:
static_path=os.path.join(os.path.dirname(__file__), '..\\client'),

on linux or mac
static_path=os.path.join(os.path.dirname(__file__), '../client'),

using os.path.join we make sure that the path will be correct on on both windows and linux


Tasks:
Add a partial page called help.html to partials
Add a controller for this page
Add a menu for this page
Add routing to this page


Step 4 - mongodb
----------------
We are now going to start using mongodb.
Read more about mongodb here:
http://docs.mongodb.org/manual/core/introduction/
You can use a gui database viewer such as robomongo for data manipulation
http://robomongo.org/
or simply use the default shell.

for using the default shell, type mongo in a terminal (or command prompt on windows)

Switch to mat database (create it if not exited already)

Create blog collection

Add some blog documents

Please note that when accessing the database through mongo cli we use the javascript api which is slightly different from the python api.

.. code-block:: bash

    use mat
    db.createCollection('blog')
    db.blog.insert({title:'Citylife',body:'I need a vacation'})
    db.blog.insert({title:'Fall',body:'Must be spring in Australia'})

now lets read the documents
.. code-block:: bash

    use mat
    db.blog.find()



As we access mongodb from python/tornado we are going to use the python api - pymongo

Let's add mongodb connection code to our server
.. code-block:: bash

    import pymongo

    mongo_client = pymongo.MongoClient('localhost:27017')
    db = mongo_client['mat']

Now lets add a tornado WebHandler that will handle blog read (later it will handle also write, delete and insert)

.. code-block:: bash

    class BlogHandler(web.RequestHandler):
        def get(self):
            from bson.json_util import dumps
            self.write(dumps(db['blog'].find()))

The function db['blog'].find() will read all reacords from blog collection
dumps will convert the data to json format
self.write - will write the data to the client ( the browser)

Now we have to tell the tornado server how to handle blog requests


.. code-block:: bash

    app = tornado.web.Application([
                          (r'/', IndexHandler),
                          # we add this line
                          (r'/api/blog', BlogHandler),


    lets start our server

.. code-block:: bash

    python app.py

open a browser at the following address

http://localhost:9915/api/blog

We get the following data which is a json representation of the documents in blog collection
[{"body": "I need a vacation!!!", "title": "Citylife", "_id": {"$oid": "5420f866057bc28085b0e2f9"}}, {"body": "Must be spring in Australia", "title": "Fall", "_id": {"$oid": "5420fe64057bc28085b0e2fa"}}]

In the next step we will learn how to handle this data in angular - that is how to write REST for angular tornado

Questions:
Where did the _id field came from? we did not add this field when creating the document?


Step 5 - REST Angular & Tornado
-------------------------------


