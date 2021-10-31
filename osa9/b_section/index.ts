import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try{
    const object = {
      weight: req.query.weight,
      height: req.query.height,
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    };
    res.json(object);
  } catch {
    res.status(400).send({ error: 'malformatted parameters'});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});