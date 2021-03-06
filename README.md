Tada Backend
============

This is the back-end for the [Tada](https://github.com/lucho870601/tada) project - a simplistic todo app created mainly to let me explore some new javascript frameworks and libraries.

The framework of choice is Flask with SQLAlchemy and Flask-Restless to handle the REST layer.

Even though the front-end is using Backbone, the initial page request will prerender all elements as plain html, so that there wont be any more requests to populate tasks, no delay and flickering. 

One cool thing I wanted to achieve, but failed is to use the same templates for Backbone and the back-end. In this case I picked Mustache for the front-end, but decided to stick to Jinja2 for the back-end, so I could not reuse any template code between front-end and back-end.

Deploy to Heroku
----------------

0. Probably you need to setup Heroku account and upload SSH public keys, etc.
1. Clone [Tada](https://github.com/lucho870601/tada) and [Tada Backend](https://github.com/lucho870601/tada_backend) so that their directories are in the same main directory.
2. Run `bower install` in Tada folder and `pip install -r requirements.txt` in Tada Backend folder to install all dependencies.
3. Get in the Tada folder and run `grunt heroku` which will copy all assets and html from the front-end in the backend.
4. Get in the Tada Backend folder and commit the changes (newly arrived assets and html) and then push to heroku `git push heroku master`.
5. Go to [http://ta-da.herokuapp.com/test](http://ta-da.herokuapp.com/test) to setup the database.

    or

Just clone [Tada Backend](https://github.com/lucho870601/tada_backend) and push it to Heroku, since all assets and html files are already there.


Demo
----

Check it out: [http://ta-da.herokuapp.com/](http://ta-da.herokuapp.com/)