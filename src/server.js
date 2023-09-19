import express from 'express';
import cors from 'cors';
import router from './router.js';
import 'dotenv/config.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

