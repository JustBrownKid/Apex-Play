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
import { CastModule } from './cast/cast.module';
import { EpisodeModule } from './episode/episode.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      stopOnTerminationSignals: false,
    }),
    CategoryModule,
    MovieModule,
    SeriesModule,
    CastModule,
    EpisodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
