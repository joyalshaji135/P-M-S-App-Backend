import app from './app';

const PORT = process.env.PORT || 4000;

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error('Error starting server:', err);
  });
