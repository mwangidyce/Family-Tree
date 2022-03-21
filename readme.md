# Family Tree Generator

This project entails building a family tree from scratch using django and html/css on the frontend.

A working demo can be seen here [Working demo](http://nyakinyori.com/). This handles more than 800 family records over many generations. Also has an admin area for member management.

This is a hobby project, with no financial incentive.

<img src="./static/Screenshot%20(2).png"  height="300">

<img src="./static/Screenshot%20(3).png"  height="300">

## Getting started

1. Create an SQL database (Postgres, MySQL, SQLite etc.) and create a **settings.env** file in the root directory. An example of settings.env will be:

(fill in appropriately)

```
SECRET_KEY=''
DB_PASSWORD="password"
DB_HOST="localhost"
DB_PORT="5432"
DB_USER=""
DB_NAME=""

```

2. Run the following command on the command line to set the respective environement variables:

```
source setup.sh
```

3. Create models and tables in your db with Django

```
python manage.py makemigrations
python manage.py migrate
```

4. Start the django server

```
python manage.py runserver
```

5. You can then populate your family tree on **/admin**
