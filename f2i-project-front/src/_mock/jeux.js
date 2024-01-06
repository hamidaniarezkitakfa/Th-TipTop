import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: sample([
    'le Grand Jeux de TipTop',
    
  ]),
  company: sample([
    '2023-08-31 12:00:00',
    '2023-02-31 02:00:00',
    '2023-05-31 22:00:00',
  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'notActive' ]),
  role: sample([
    '2023-09-15 12:00:00',
    '2023-10-15 12:00:00',
    '2023-12-15 12:00:00'
  ]),
}));
