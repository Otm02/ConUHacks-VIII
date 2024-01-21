from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/all/', methods=['GET'])
def fetchData():
    try:
        return jsonify({'message': 'Test message'}), 200
    except Exception as e:
        print(e) #To print the type of error...

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('127.0.0.1', 5100, app)
