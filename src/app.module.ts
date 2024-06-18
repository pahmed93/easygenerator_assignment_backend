import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user.service';
import { UserSchema } from './models/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/local'),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   const corsOptions = {
  //     origin: 'http://localhost:3000', // <- Your frontend domain
  //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //     allowedHeaders: ['Content-Type', 'application/json'], // Ensure this is an array of strings
  //   };

  //   consumer.apply((req, res) => {
  //     res.setHeader('Access-Control-Allow-Origin', corsOptions.origin);
  //     res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(','));
  //     res.setHeader('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
  //   }).forRoutes('*');
  // }
}
