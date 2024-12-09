from flask import Flask

from src.modules.router.Router import router

app = Flask(__name__)
app.register_blueprint(router)

if __name__ == '__main__':
    app.run(port=8000, debug=True)

