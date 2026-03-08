import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
const distDir = path.join(__dirname, 'dist');

app.disable('x-powered-by');
app.use(express.static(distDir, {
  extensions: ['html'],
}));

app.get('/', (_request, response) => {
  response.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, host, () => {
  console.log(`stream-overlay server listening on http://${host}:${port}`);
});