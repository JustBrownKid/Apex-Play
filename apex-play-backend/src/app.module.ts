import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { SeriesModule } from './series/series.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, DrizzleModule,
    ConfigModule
      .forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-fallback-secret',
        signOptions: { expiresIn: '5h' },
      }),
      inject: [ConfigService],
    }),

    CategoryModule,
    MovieModule,
    SeriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
