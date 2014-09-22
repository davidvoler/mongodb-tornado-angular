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


Step 2 - look and feel
----------------------
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
Now it is time to add angualrjs

First lets add the angularjs code from CDN
We add the angualrjs library code to the end of the body in the index.html

<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular.min.js"></script>

Lets create a new directory: client  where we are going to store our own javascript code and html partial files.
in the client directory we create 2 more diretories
js
partials

We are going to add 3 files:

app.js
config.js
controllers.js


Step 4 - blog
-------------


Step 3 - saving new blogs to mongods
------------------------------------


