import { Module } from '@nestjs/common';
import { PlaylistService } from './services/playlist.service';
import { PlaylistController } from './controllers/playlist.controller';
import { SpotifyPlaylistService } from './services/spotify-playlist.service';
import { YoutubePlaylistService } from './services/youtube-playlist.service';

@Module({
  imports: [],
  providers: [PlaylistService, YoutubePlaylistService, SpotifyPlaylistService],
  controllers: [PlaylistController],
})
export class MusicModule {}
