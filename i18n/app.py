#!/usr/bin/env python3
"""
THis file we use for create a simple Flask App
"""
from datetime import datetime
import pytz
from flask import Flask, render_template, request, g
from flask_babel import Babel, format_datetime


class Config:
    """
    We use that class for create basic config parameters for our app
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """
    We use this documentation for getting user from the our DB
    """
    try:
        user_id = request.args.get("login_as")
        return users.get(int(user_id))
    except (TypeError, ValueError):
        return None


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel()


@app.before_request
def before_request():
    """We use that for add the func before request"""
    g.user = get_user()
    if g.user:
        tz_name = g.user.get('timezone', app.config['BABEL_DEFAULT_TIMEZONE'])
        try:
            tz = pytz.timezone(tz_name)
        except pytz.UnknownTimeZoneError:
            tz = pytz.timezone(app.config['BABLE_DEFAULT_LANGUAGE'])

        now_utc = datetime.utcnow()
        now_user = pytz.utc.localize(now_utc).astimezone(tz)

        g.user['current_time'] = format_datetime(now_user, format='medium')


def get_locale():
    """
    We use this function for getting the lang from browser
    """
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale

    if g.user and g.get('locale') in app.config['LANGUAGES']:
        return g.user.get('locale')

    return request.accept_languages.best_match(app.config['LANGUAGES'])


def get_timezone():
    """
    we use that function for getting a timezone from browser
    """
    timezone = request.args.get('timezone')

    if timezone:
        try:
            pytz.timezone(timezone)
            return timezone
        except pytz.UnknownTimeZoneError:
            pass

    if g.user:
        try:
            zone = g.user.get('timezone')
            pytz.timezone(zone)
            return zone
        except pytz.UnknownTimeZoneError:
            pass

    return app.config['BABEL_DEFAULT_TIMEZONE']


babel.init_app(app, locale_selector=get_locale, timezone_selector=get_timezone)


@app.route('/')
def main_page():
    """
    This route is main route, which show us the main page
    """
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
