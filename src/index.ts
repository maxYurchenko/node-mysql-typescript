import express from 'express';
import api from './api';
const app = express();
const port = 8000;
app.use('/api/v1/', api);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
