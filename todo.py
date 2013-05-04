import os

from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restless import APIManager, helpers

from operator import attrgetter
from itertools import imap, izip

from models import some_lame_dependancy_here

app = Flask(__name__)
run_config = dict()
if os.environ.get('HEROKU_POSTGRESQL_AMBER_URL'):
    # heroku
    run_config['debug'] = True
    run_config['port'] = os.environ['PORT']
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['HEROKU_POSTGRESQL_AMBER_URL']
else:
    run_config['debug'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
Task = some_lame_dependancy_here(db)['Task'] # how to get rid of this :/
manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Task, methods=['GET', 'POST', 'PUT', 'DELETE'])

@app.route('/test')
def test():
    t = Task('hi', False, 1)
    db.session.add(t)
    db.session.commit()
    tasks = Task.query.all()
    return 'hello world! -> ' + repr(tasks)

@app.route('/')
def index():
    tasks = Task.query.all()
    
    sorted_tasks_dict = []
    if len(tasks):
    
        ids = set(imap(attrgetter('id'), tasks))
        next_ids = set(imap(attrgetter('next_id'), tasks))
        head_set = (ids - next_ids)
        if not head_set:
            # somehow we lost the head of the linked list - just serve whatever we can
            sorted_tasks_dict = map(helpers.to_dict, tasks)
        else:
            # we found the head - start rebuilding the linked list
            head = head_set.pop()
            lookup = dict(izip(imap(attrgetter('id'), tasks), tasks))
    
            sorted_tasks = []
            i = head
            while lookup[i].next_id is not None:
                sorted_tasks.append(lookup[i])
                i = lookup[i].next_id
            sorted_tasks.append(lookup[i])
    
            sorted_tasks_dict = map(helpers.to_dict, sorted_tasks)
        
    return render_template('index.html', tasks=sorted_tasks_dict)

if __name__ == '__main__':
    db.create_all()
    app.run(**run_config)


