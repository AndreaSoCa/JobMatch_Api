import express from 'express';
import bodyParser from "body-parser";
import userRouter from './routes/user.js';
import workerRouter from './routes/worker.js'
import workRouter from './routes/work.js'
import cors from 'cors';
import mainRouter from './routes/main.js';

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//End points
app.use('/',mainRouter);
app.use('/job-match/user', userRouter);

// WORKER
app.use('/job-match/worker', workerRouter);

//Work
app.use('/job-match/work', workRouter);

app.get('/job-match', (req, res) => {
    res.send("API response");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}` );
})