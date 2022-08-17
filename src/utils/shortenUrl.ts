import { Buffer } from 'buffer';
import baseX from 'base-x';
import md5 from 'md5';

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const shortenUrl = (url: string) => {
  const md5String = md5(url).slice(0, 7);

  return baseX(BASE62).encode(Buffer.from(md5String));
};

export default shortenUrl;
