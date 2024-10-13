import { Body, Controller, Post, Res } from '@nestjs/common';
import { PlaylistService } from '../services/playlist.service';
import { Response } from 'express';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('import')
  async importPlaylist(@Body() body: any, @Res() res: Response) {
    const { url } = body;

    const playlist = await this.playlistService.importPlaylist(url);
    // return playlist;

    return res.json({
      status: 'success',
      playlist,
    });
  }
}
