import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PlaylistIdNotFoundException } from '../exceptions/playlist-id-not-found.exception';

@Injectable()
export class YoutubePlaylistService {
  private readonly apiBaseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private readonly configService: ConfigService) {}

  async importFromPlatform(playlistUrl: string): Promise<any> {
    const playlistId = this.extractPlaylistId(playlistUrl);
    const apiKey = this.configService.get<string>('YOUTUBE_API_KEY');

    return await this.getYouTubePlaylist(playlistId, apiKey);
  }

  async savePlaylist(playlist: any) {
    console.log('YoutubePlaylistService Saving YouTube playlist:', playlist);
  }

  private async getYouTubePlaylist(playlistId: string, apiKey: string) {
    const url = `${this.apiBaseUrl}/playlists?part=snippet,contentDetails&id=${playlistId}&key=${apiKey}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch playlist from YouTube: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  }

  private extractPlaylistId(playlistUrl: string): string {
    const url = new URL(playlistUrl);

    const playlistId = url.searchParams.get('list');

    if (!playlistId) {
      throw new PlaylistIdNotFoundException();
    }

    return playlistId;
  }
}
