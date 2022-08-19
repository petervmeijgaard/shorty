import { Buffer } from 'buffer';
import base from 'base-x';
import md5 from 'md5';

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const shortenUrl = (url: string) => {
  const md5Substring = md5(url).slice(0, 7);

  return base(BASE62).encode(Buffer.from(md5Substring));
};

export default shortenUrl;
