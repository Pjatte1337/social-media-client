import { createPost } from './create';

const title = 'This is a test';
const body = 'my test works';
const media = null;

const data = { title, body, media };

function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 201,
    statusText: 'Lets go! all good',
    json: () => Promise.resolve(data),
  });
}

describe('Create post', () => {
  it('Success', async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const test = await createPost(data);
    expect(test).toBe(data);
  });
});
