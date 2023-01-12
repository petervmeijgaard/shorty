import { FC, memo } from 'react';
import BodyTableCell from './BodyTableCell';

const NotFoundTableRow: FC = () => (
  <tr>
    <BodyTableCell colSpan={4}>No URLs shortened yet</BodyTableCell>
  </tr>
);

export default memo(NotFoundTableRow);
