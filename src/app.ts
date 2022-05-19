import { AppDataSource, env } from './data-source';
import express, { json } from 'express';
import taskRouter from './routes/task';

const app = express();

const main = async () => {
    try {
        await AppDataSource.initialize();

        console.log('successfuly connected to db');

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