import datetime

from flask_login import UserMixin
from sqlalchemy import desc
from . import db


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text)
    username = db.Column(db.Text)
    password = db.Column(db.Text)
    tasks = db.relationship("Task", lazy="dynamic")

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)

    @classmethod
    def all(cls):
        return [i for i in User.query.all()]

    def add(self):
        db.session.add(self)
        db.session.commit()

    def edit(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        return {
            "username": self.username,
            "email": self.email,
        }


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.Text)
    description = db.Column(db.Text)
    tag = db.Column(db.Text)
    done = db.Column(db.Boolean, default=False)
    pinned = db.Column(db.Boolean, default=False)
    date_added = db.Column(db.DateTime)
    date_done = db.Column(db.DateTime)

    def __init__(self, **kwargs):
        super(Task, self).__init__(**kwargs)

    @classmethod
    def all(cls, id_: int):
        return Task.query.filter(Task.user_id == id_).order_by(
            desc(Task.pinned), desc(Task.id)
        )

    @classmethod
    def get(cls, id_: int):
        return Task.query.get(id_)

    def add(self):
        db.session.add(self)
        db.session.commit()

    def edit(self):
        db.session.commit()

    def toggle(self):
        self.done = not self.done
        self.date_done = datetime.datetime.now() if self.done else None

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "tag": self.tag,
            "done": self.done,
            "pinned": self.pinned,
            "date_added": self.date_added.strftime("%-m/%-d"),
            "date_done": self.date_done.strftime("%-m/%-d") if self.date_done else None,
        }
