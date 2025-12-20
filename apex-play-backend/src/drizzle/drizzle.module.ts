import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './index';

export const DRIZZLE = 'DRIZZLE';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const pool = new Pool({
                    user: configService.get<string>('DB_USER'),
                    password: configService.get<string>('DB_PASSWORD'),
                    host: configService.get<string>('DB_HOST'),
                    database: configService.get<string>('DB_NAME'),
                    port: configService.get<number>('DB_PORT'),
                    ssl: true,
                });

                return drizzle(pool, { schema });
            },
        },
    ],

    exports: [DRIZZLE],
})
export class DrizzleModule { }