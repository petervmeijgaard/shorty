import { FC, memo } from 'react';
import BodyTableCell from './BodyTableCell';

const ErrorTableRow: FC = () => (
  <tr>
    <BodyTableCell colSpan={4}>
      Something went wrong and loading the URLs failed.
    </BodyTableCell>
  </tr>
);

export default memo(ErrorTableRow);
