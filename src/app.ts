import { AppDataSource, env } from './data-source';
import express from 'express';

const app = express();

const main = async () => {
    try {
        await AppDataSource.initialize();
        
        console.log('successfuly connected to db');

        app.listen(env.PORT, () => {
            console.log(`listening on port ${env.PORT}`);
        });

    } catch (err) {
        console.log(err)
    }
}

main();

