/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './modules/assets/assets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsModule } from './modules/wallets/wallets.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:admin@localhost:27017/nest?authSource=admin&directConnection=true',
    ),
    AssetsModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
