import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    BlogsModule,
    AuthModule,
    MulterModule.register({
      dest: './public/images/',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
