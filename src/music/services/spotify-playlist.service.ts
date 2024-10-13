import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PlaylistIdNotFoundException } from '../exceptions/playlist-id-not-found.exception';

@Injectable()
export class SpotifyPlaylistService {
  constructor(private readonly configService: ConfigService) {}

  async getAccessToken(): Promise<string> {
    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'SPOTIFY_CLIENT_SECRET',
    );

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Failed to get access token from Spotify');
    }

    const data = await response.json();
    return data.access_token;
  }

  async importFromPlatform(playlistUrl: string) {
    const playlistId = this.extractPlaylistId(playlistUrl);
    const accessToken = await this.getAccessToken();
    return await this.getSpotifyPlaylist(playlistId, accessToken);
  }

  async savePlaylist(playlist) {
    console.log('SpotifyPlaylistService Saving playlist:', playlist);
    // playlist.tracks?.items?.map(() => {});
  }

  private async getSpotifyPlaylist(playlistId: string, token: string) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('getSpotifyPlaylist: ', response);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch playlist from Spotify: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  }

  private extractPlaylistId(playlistUrl: string): string {
    const url = new URL(playlistUrl);
    const pathParts = url.pathname.split('/');

    const playlistId = pathParts[pathParts.length - 1];

    if (!playlistId) {
      throw new PlaylistIdNotFoundException();
    }

    return playlistId;
  }
}
