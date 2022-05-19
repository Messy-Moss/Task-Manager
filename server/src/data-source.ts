import "reflect-metadata";
import { DataSource } from "typeorm";
import { load } from "ts-dotenv";
import Task from "./models/Task";

export const env = load({
    PORT: Number,
    DATABASE_NAME: String,
    DATABASE_PASSWORD: String
});

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
    database: "Task-Manager",
    entities: [Task],
    synchronize: true,
    logging: false,
});
