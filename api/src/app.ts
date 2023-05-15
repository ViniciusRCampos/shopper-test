import express from 'express';
import productRoute from './routes/ProductRoutes';
import packRoute from './routes/PackRoutes';
import cors from 'cors';
// Vinicius Campos

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(cors({
      origin: '*', 
    }));
    this.app.use(accessControl);
    this.app.use(productRoute);
    this.app.use(packRoute);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };