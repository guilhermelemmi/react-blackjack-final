import cors from 'cors';
import express from 'express';

import rulesRoutes from './routes/rules.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/rules', rulesRoutes);

app.listen(8000, () => {
  console.log(`App server now listening on port 8000`);
});
