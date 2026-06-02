#!/usr/bin/env python3
"""
THis file we use for create a simple Flask App
"""
import flask
from flask import Flask, render_template, request
from typing import Optional, Dict
from flask_babel import Babel


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


def get_user() -> Optional[Dict]:
    """Return a user dictionary from the 'users' mapping using the
    'login_as' request argument; return None if the argument is missing
    or invalid.
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
def before_request() -> None:
    """Executed before each request; attach user to the request context."""
    flask.g.user = get_user()


def get_locale() -> str:
    """Return the best locale following this priority:

    1. Locale from URL parameters
    2. Locale from user settings
    3. Locale from request header
    4. Default locale
    """
    # 1. Locale from URL parameters
    url_locale = request.args.get('locale')
    if url_locale and url_locale in app.config['LANGUAGES']:
        return url_locale

    # 2. Locale from user settings
    user = getattr(flask.g, 'user', None)
    if user:
        user_locale = user.get('locale')
        if user_locale and user_locale in app.config['LANGUAGES']:
            return user_locale

    # 3. Locale from request header
    header_locale = request.accept_languages.best_match(app.config['LANGUAGES'])
    if header_locale:
        return header_locale

    # 4. Fallback to default locale
    return app.config.get('BABEL_DEFAULT_LOCALE')


babel.init_app(app, locale_selector=get_locale)


@app.route('/')
def main_page() -> str:
    """
    This route is main route, which show us the main page
    """
    return render_template('6-index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
