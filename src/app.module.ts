import { Module } from '@nestjs/common';
import { MusicModule } from './music/music.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MusicModule,
    RouterModule.register([
      {
        path: 'music',
        module: MusicModule,
      },
    ]),
  ],
})
export class AppModule {}
