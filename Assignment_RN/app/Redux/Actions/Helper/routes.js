import { apiKeys } from './apiKeys';

export const generateRoute = (apiKey, data) => {
  switch (apiKey) {
    default: {
      return null;
    }
    case apiKeys.topalbums:
      return `https://itunes.apple.com/us/rss/topalbums/limit=100/json`;
  }
};

export const requestHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache'
  };
  return headers;
};
