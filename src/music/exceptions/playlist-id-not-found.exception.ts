import { HttpException, HttpStatus } from '@nestjs/common';

export class PlaylistIdNotFoundException extends HttpException {
  constructor() {
    super('Playlist ID not found in the URL', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
