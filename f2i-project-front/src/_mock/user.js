import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: sample([
    'essaid@gmail.com',
    'arezki@gmail.com',
    'ibrahim@gmail.com',
    'oussama@gmail.com'
  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'NotPacticiped']),
  role: sample([
    'Admin',
    'Worker',
    'User'
  ]),
}));
