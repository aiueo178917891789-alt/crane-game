from flask import Flask, Response, request
import requests

app = Flask(__name__)

@app.route('/video_feed1')
def video_feed1():
    url = 'http://126.207.71.48:5000/video_feed1'
    r = requests.get(url, stream=True)
    return Response(r.iter_content(chunk_size=1024), content_type=r.headers['content-type'])

@app.route('/video_feed2')
def video_feed2():
    url = 'http://126.207.71.48:5000/video_feed2'
    r = requests.get(url, stream=True)
    return Response(r.iter_content(chunk_size=1024), content_type=r.headers['content-type'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)