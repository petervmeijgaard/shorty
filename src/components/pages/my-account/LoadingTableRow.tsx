import { FC, memo } from 'react';
import BodyTableCell from '@/components/pages/my-account/BodyTableCell';
import Shimmer from '@/components/ui/Shimmer';

const LoadingTableRow: FC = () => (
  <tr>
    <BodyTableCell>
      <Shimmer className="h-6 w-[250px]" />
    </BodyTableCell>
    <BodyTableCell>
      <Shimmer className="h-6 w-[100px]" />
    </BodyTableCell>
    <BodyTableCell>
      <Shimmer className="h-6 w-[30px]" />
    </BodyTableCell>
    <BodyTableCell>
      <Shimmer className="h-6 w-[24px]" />
    </BodyTableCell>
  </tr>
);

export default memo(LoadingTableRow);
