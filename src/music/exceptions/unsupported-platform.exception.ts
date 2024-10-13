import { HttpException, HttpStatus } from '@nestjs/common';

export class UnsupportedPlatformException extends HttpException {
  constructor() {
    super('Unsupported platform', HttpStatus.BAD_REQUEST);
  }
}
