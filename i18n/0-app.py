#!/usr/bin/env python3
"""
THis file we use for create a simple Flask App
"""
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def main_page():
    """
    This route is main route, which show us the main page
    """
    return render_template('0-index.html')


if "__main__" == __name__:
    app.run(debug=True)
