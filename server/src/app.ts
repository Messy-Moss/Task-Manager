import { AppDataSource, env } from './data-source';
import express, { json } from 'express';
import taskRouter from './routes/task';
import cors from 'cors';

const app = express();

const main = async () => {
    try {
        await AppDataSource.initialize();

        console.log('successfuly connected to db');

        app.use(cors({
            origin: 'http://localhost:8080',
            methods: '*'
        }));

        app.use(json());

        app.use('/tasks', taskRouter);

        app.listen(env.PORT, () => {
            console.log(`listening on port ${env.PORT}`);
        });

    } catch (err) {
        console.log(err)
    }
}

main();