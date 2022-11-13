require('dotenv/config');

import { login } from './login';
import * as storage from '../../storage/index.js';

// Mock login details
const mockEmail = 'klovn@email.com';
const mockPassword = 'klovn123';
const mockResponse = {
  name: 'The fake pjatte',
  email: 'klovn@email.com',
  avatar:
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fstock-photos%2Frip.html&psig=AOvVaw1ohi2u5ORLgHTqFma9mIUz&ust=1668192469961000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPjTz7CjpPsCFQAAAAAdAAAAABAD',
  banner:
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsakhashree.com%2Fwhy-do-i-give-up-so-easily%2F&psig=AOvVaw0UyOdvmA1obfzgkfEKFOmo&ust=1668192495694000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCICZn72jpPsCFQAAAAAdAAAAABAD',
  accessToken: 'asjdisaøvdfnvjsaue',
  password: 'klovn@email.com',
};
const mockData = { email: mockEmail, password: mockPassword };

// Function to retrieve a success login
function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 201,
    statusText: 'lfg you did it',
    json: () => Promise.resolve(mockResponse),
  });
}

// Function to retrieve a fail login
function fetchFailure(status, statusText) {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
}

// Mock localstorage
class LocalStorageMock {
  constructor() {
    this.value = {};
  }

  clear() {
    this.value = {};
  }

  getItem(token) {
    return this.value[token] || null;
  }

  setItem(token, value) {
    this.value[token] = String(value);
  }

  removeItem(token) {
    delete this.value[token];
  }
}

global.localStorage = new LocalStorageMock();

describe('Authorizationr', () => {
  it('success', async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const response = await login(mockEmail, mockPassword);
    const token = storage.save('token', mockResponse.mockToken);
    const profile = storage.save(
      'profile',
      mockResponse.name,
      mockResponse.avatar,
      mockResponse.banner,
      mockResponse.email
    );
    localStorage.setItem(token, profile);
    expect(response).toEqual(mockResponse);
  });

  it('failure', async () => {
    global.fetch = jest.fn(() => fetchFailure(401, 'Unauthorized'));
    await expect(login(mockData)).rejects.toThrow('Unauthorized');
  });
});
