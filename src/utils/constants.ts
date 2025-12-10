export const LOGO_TEXT = 'MovieGPT';

export const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const USER_AVATAR =
  'https://occ-0-3213-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXrTcV6KUM7rT_zVf_3kE4nFkjtI2IcTwghlVn3IxHnH_4ZVTt3V4AKhLj6fTl9JjCZraUA2hnugtSwxWjufGgxRYRtV1D64nRQ2.png?r=a13';

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w780/';
export const IMG_CDN_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original/';

export const SUPPORTED_LANGUAGE = [
  { identifier: 'en', name: 'English' },
  { identifier: 'hindi', name: 'Hindi' },
  { identifier: 'spanish', name: 'Spanish' },
];

