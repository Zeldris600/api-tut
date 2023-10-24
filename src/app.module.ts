/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
// import { AppService } from './app.service';
import { PostsModule } from './posts/post.modules';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authtentication/authentication.module';
import { ExceptionsFilterLogger } from './utils/exceptionsLogger.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [AuthenticationModule, PostsModule, DatabaseModule, ConfigModule.forRoot({
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number(),
      JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
      JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
      JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
      JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),

    })
  }),



  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
