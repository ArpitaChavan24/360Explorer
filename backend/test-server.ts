import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  console.log('Health check received');
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Test server running on http://0.0.0.0:${PORT}`);
  console.log('Press Ctrl+C to stop');
});