import app from './app';
import { loadRoutes } from './routes';

async function start() {
  const port = 3000;

  await loadRoutes(app);

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

start();
