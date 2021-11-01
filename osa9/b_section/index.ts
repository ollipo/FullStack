/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());

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

app.post('/exercises', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = request.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target: number = body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const daily_exercises: Array<number> = body.daily_exercises;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!body.daily_exercises || !body.target) {
    return response.status(400).json({ 
      error: 'content missing' 
    });
  }
  if(daily_exercises.some(a => isNaN(Number(a))) || isNaN(target)) {
    return response.status(400).json({ 
      error: 'malformatted parameters' 
    });
  }
  try {
    const result = exerciseCalculator(target, daily_exercises);
    return response.json(result);
  } catch {
    return response.status(400).json({ 
      error: 'malformatted parameters'
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});