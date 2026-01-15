import datetime
from flask import current_app, request, send_from_directory
from flask_login import current_user, login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash

from .models import Task, User
from . import login_manager


@login_manager.user_loader
def load_user(id_: int):
    return User.query.get(id_)


@current_app.route("/")
def index():
    return send_from_directory(current_app.static_folder, "index.html")


@current_app.post("/signup")
def signup():
    success = True
    msg = ""
    user_ = None

    try:
        email = request.json.get("email")
        username = request.json.get("username")
        password = request.json.get("password")
        password_confirm = request.json.get("passwordConfirm")

        usernames = [i.username for i in User.all()]
        emails = [i.email for i in User.all()]

        if (
            password == password_confirm
            and username not in usernames
            and email not in emails
        ):
            user__ = User(
                email=email,
                username=username,
                password=generate_password_hash(password),
            )

            user__.add()
            login_user(user__)

            user_ = user__.to_dict()

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "user": user_}


@current_app.post("/login")
def login():
    success = True
    msg = ""
    user_ = None

    try:
        username = request.json.get("username")
        password = request.json.get("password")

        user__: User = User.query.filter_by(username=username).first()
        if user__ and check_password_hash(user__.password, password):
            user_ = user__.to_dict()
            login_user(user__)
        else:
            success = False
            msg = "User not found, Try again"

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "user": user_}


@current_app.post("/logout")
def logout():
    success = True
    msg = ""

    try:
        logout_user()
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg}


@current_app.post("/add_task")
def add_task():
    success = True
    msg = ""
    task_ = None
    tasks_ = []

    try:
        task_ = Task(
            title=request.json.get("title"),
            user_id=current_user.id,
            date_added=datetime.datetime.now(),
        )
        task_.add()

        tasks_ = [i.to_dict() for i in Task.all(current_user.id)]
        task_ = task_.to_dict()
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "task": task_, "tasks": tasks_}


@current_app.post("/get_tasks")
def get_tasks():
    success = True
    msg = ""
    tasks_ = []

    try:
        tasks_ = [i.to_dict() for i in Task.all(current_user.id)]
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "tasks": tasks_}


@current_app.post("/edit_task")
def edit_task():
    success = True
    msg = ""
    task_ = None
    tasks_ = []

    try:
        task_ = Task.get(int(request.json.get("id")))
        task_.title = request.json.get("title")
        task_.description = request.json.get("description")
        task_.tag = request.json.get("tag")

        task_.edit()

        tasks_ = [i.to_dict() for i in Task.all(current_user.id)]
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "tasks": tasks_}


@current_app.post("/toggle_task")
def toggle_task():
    success = True
    msg = ""
    task_ = None
    tasks_ = []

    try:
        task_ = Task.get(int(request.json.get("id")))
        task_.toggle()

        tasks_ = [i.to_dict() for i in Task.all(current_user.id)]
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "tasks": tasks_}


@current_app.post("/delete_task")
def delete_task():
    success = True
    msg = ""
    task_ = None
    tasks_ = []

    try:
        task_ = Task.get(int(request.json.get("id")))
        task_.delete()

        tasks_ = [i.to_dict() for i in Task.all(current_user.id)]
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "tasks": tasks_}


@current_app.post("/get_users")
def get_users():
    success = True
    msg = ""
    users_ = []

    try:
        users_ = [i.to_dict() for i in User.all()]
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "users": users_}
