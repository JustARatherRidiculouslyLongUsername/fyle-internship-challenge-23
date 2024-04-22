export type UserProfile = {
  accountURL: string;
  profilePhotoURL: string;
  bio: string | null;
  fullName: string | null;
  location: string | null;
  twitterHandle?: string | null;
  reposCount: number;
};
