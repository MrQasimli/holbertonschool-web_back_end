"""
Simple test runner for 6-app.py that uses Flask's test client to request
several URLs and prints the <p> paragraph from the rendered HTML so we can
verify the locale selection logic without launching a server.
"""
from importlib.machinery import SourceFileLoader
from html import unescape
import re

module_path = r"c:\Users\vivex\Desktop\Holberton All Tasks\holbertonschool-web_back_end\i18n\6-app.py"
mod = SourceFileLoader("six_app", module_path).load_module()
app = getattr(mod, 'app')

urls = [
    '/?login_as=3',
    '/?login_as=1&locale=en',
    '/?login_as=42&locale=fr',
    '/',
]

p = re.compile(r'<p>(.*?)</p>', re.S)

with app.test_client() as client:
    for u in urls:
        resp = client.get(u)
        html = resp.get_data(as_text=True)
        match = p.search(html)
        text = unescape(match.group(1).strip()) if match else '<no-paragraph>'
        print(u, '=>', text)
