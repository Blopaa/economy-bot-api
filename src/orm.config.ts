import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const pgConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Pablo063110",
    database: "Stackly Bot",
    synchronize: true,
    entities: [
       "dist/**/*.entity{.ts,.js}"
    ]
}