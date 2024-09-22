import { Body, Controller, Post, Res } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Response } from 'express';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('import')
  async importPlaylist(@Body() body: any, @Res() res: Response) {
    const { url } = body;

    console.log('PlaylistController: ', url);

    const playlist = await this.playlistService.importFromPlatform(url);

    await this.playlistService.savePlaylist(playlist);

    return res.json({
      status: 'success',
      playlist,
    });
  }
}
