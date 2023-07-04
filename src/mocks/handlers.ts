import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/users', (req, res, ctx) => {
    // Mock response data
    const data = [{
      id: 0,
      name: 'Mike Potts',
      jobTitle: 'CEO',
      tenure: '5',
      gender: 'Male',
    },
    {
      id: 1,
      name: 'Tom Connor',
      jobTitle: 'Developer',
      tenure: '2',
      gender: 'Male',
    },
    {
      id: 2,
      name: 'Jesse Karl',
      jobTitle: 'Developer',
      tenure: '3',
      gender: 'Male',
    }];

    return res(ctx.json(data));
  }),
];
