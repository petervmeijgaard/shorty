import Link from 'next/link';
import { FC, memo, useCallback } from 'react';
import { GetElementType } from '@/types/helpers';
import { RouterOutputs } from '@/utils/api';
import BodyTableCell from './BodyTableCell';

type Props = GetElementType<RouterOutputs['shorty']['myUrls']>;
const DataTableRow: FC<Props> = ({ id, url, shortUrl, hits }) => {
  const onDelete = useCallback(() => {
    console.log({ id });
  }, [id]);

  return (
    <tr>
      <BodyTableCell>{url}</BodyTableCell>
      <BodyTableCell>
        <Link href={`/${shortUrl}`} target="_blank">
          /{shortUrl}
        </Link>
      </BodyTableCell>
      <BodyTableCell>{hits}</BodyTableCell>
      <BodyTableCell onClick={onDelete}>Test</BodyTableCell>
    </tr>
  );
};

export default memo(DataTableRow);
