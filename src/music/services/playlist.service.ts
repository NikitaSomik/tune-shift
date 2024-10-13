import { Injectable } from '@nestjs/common';
import { YoutubePlaylistService } from './youtube-playlist.service';
import { SpotifyPlaylistService } from './spotify-playlist.service';
import { UnsupportedPlatformException } from '../exceptions/unsupported-platform.exception';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly youtubeService: YoutubePlaylistService,
    private readonly spotifyService: SpotifyPlaylistService,
  ) {}

  async importPlaylist(playlistUrl: string): Promise<any> {
    if (playlistUrl.includes('youtube.com')) {
      return await this.youtubeService.importFromPlatform(playlistUrl);
    } else if (playlistUrl.includes('spotify.com')) {
      return await this.spotifyService.importFromPlatform(playlistUrl);
    } else {
      throw new UnsupportedPlatformException();
    }
  }

  async savePlaylist(playlist: any) {
    console.log('PlaylistService Saving playlist:', playlist);
  }
}
