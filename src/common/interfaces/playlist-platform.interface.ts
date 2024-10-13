export interface PlaylistPlatform {
  importFromPlatform(playlistUrl: string): Promise<any>;
  savePlaylist(playlist: any): void;
}
