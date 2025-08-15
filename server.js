const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static('public')); // index.htmlがあるフォルダ

app.get('/video_feed1', async (req, res) => {
  try {
    const response = await fetch('http://56.155.112.50:5000/video_feed1');
    res.set('Content-Type', response.headers.get('content-type'));
    response.body.pipe(res);
  } catch (error) {
    res.status(500).send('映像の取得に失敗しました');
  }
});

app.get('/video_feed2', async (req, res) => {
  try {
    const response = await fetch('http://56.155.112.50:5000/video_feed2');
    res.set('Content-Type', response.headers.get('content-type'));
    response.body.pipe(res);
  } catch (error) {
    res.status(500).send('映像の取得に失敗しました');
  }
});

app.post('/command', express.json(), async (req, res) => {
  try {
    await fetch('http://56.155.112.50:5000/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.status(200).send();
  } catch (error) {
    res.status(500).send('コマンドの送信に失敗しました');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('サーバーが起動しました');
});