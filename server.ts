import 'module-alias/register';
import app from './app';

const PORT = process.env.PORT || 4000;

app
  .listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  })
  .on('error', (err) => {
    console.error('Error starting server:', err);
  });
