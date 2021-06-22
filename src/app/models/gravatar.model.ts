export interface GravatarPhoto {
  value: string;
  type: string;
}

export interface GravatarProfile {
  id: string;
  hash: string;
  requestHash: string;
  profileUrl: string;
  preferredUsername: string;
  thumbnailUrl: string;
  photos: GravatarPhoto[];
  // name: { givenName: string, familyName: string, formatted: string }
  displayName: string;
  aboutMe?: string;
  currentLocation?: string;
  urls: string[];
}
export interface GravatarResponse {
  entry: GravatarProfile[];
}
