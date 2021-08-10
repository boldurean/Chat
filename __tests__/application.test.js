// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockedSocket from 'socket.io-mock';

import init from '../src/init.jsx';

const server = setupServer();
let socket; // eslint-disable-line

const mockInitialData = (_req, res, ctx) => {
  const data = {
    channels: [{ id: 1, name: 'General' }, { id: 2, name: 'Random' }],
    messages: [],
    currentChannelId: 1,
  };

  return res(
    ctx.status(200),
    ctx.json(data),
  );
};

const mockSignup = (_req, res, ctx) => res(
  ctx.status(200),
  ctx.json({ token: 'token', username: 'user' }),
);

const mockSingin = (_req, res, ctx) => res(
  ctx.status(201),
  ctx.json({ token: 'token', username: 'user' }),
);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: (req) => {
      console.error(`There is no handler for "${req.url.href}"`);
    },
  });
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  socket = new MockedSocket();

  socket.on('newMessage', (message, ack) => {
    socket.emit('newMessage', { ...message, id: 1 });
    ack({ status: 'ok' });
  });

  socket.on('newChannel', (channel, ack) => {
    const data = { ...channel, id: 3, removable: true };
    socket.emit('newChannel', data);
    ack({ status: 'ok', data });
  });

  socket.on('renameChannel', (channel, ack) => {
    socket.emit('renameChannel', { ...channel, removable: true });
    ack({ status: 'ok' });
  });

  socket.on('removeChannel', (channel, ack) => {
    socket.emit('removeChannel', { ...channel, removable: true });
    ack({ status: 'ok' });
  });

  global.localStorage.clear();
  socket.socketClient.volatile = { emit: socket.socketClient.emit.bind(socket.socketClient) };
  const vdom = await init(socket.socketClient);
  render(vdom);
  userEvent.click(await screen.findByText(/Hexlet Chat/i));
});

afterEach(() => {
  server.resetHandlers();
});

describe('auth', () => {
  test('login page on enter as guest', async () => {
    expect(window.location.pathname).toBe('/login');
    expect(await screen.findByLabelText(/Nickname/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('handle login error', async () => {
    server.use(rest.post('/api/v1/login', (_req, res, ctx) => res(ctx.status(401))));
    expect(screen.queryByText(/Incorrect user or password/i)).not.toBeInTheDocument();
    userEvent.type(await screen.findByLabelText(/Nickname/i), 'guest');
    userEvent.type(await screen.findByLabelText(/Password/i), 'pass');
    userEvent.click(await screen.findByRole('button', { name: /Log in/i }));

    expect(await screen.findByText(/Incorrect user or password/i)).toBeInTheDocument();
  });

  test('successful login', async () => {
    server.use(
      rest.post('/api/v1/login', mockSingin),
      rest.get('/api/v1/data', mockInitialData),
    );

    userEvent.type(await screen.findByLabelText(/Nickname/i), 'user');
    userEvent.type(await screen.findByLabelText(/Password/i), 'pass');
    userEvent.click(await screen.findByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});

describe('registration', () => {
  test('handle new user creation', async () => {
    server.use(
      rest.post('/api/v1/signup', mockSignup),
      rest.get('/api/v1/data', mockInitialData),
    );

    userEvent.click(await screen.findByRole('link', { name: /Register/i }));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/signup');
    });
    userEvent.type(await screen.findByLabelText(/Username/i), 'user');
    userEvent.type(await screen.findByLabelText(/^Password$/i), 'password');
    userEvent.type(await screen.findByLabelText(/Confirm password/i), 'password');
    userEvent.click(await screen.findByRole('button', { name: /Sign up/i }));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  test('handle validation', async () => {
    userEvent.click(await screen.findByRole('link', { name: /Register/i }));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/signup');
    });
    userEvent.type(await screen.findByLabelText(/Username/i), 'u');
    userEvent.type(await screen.findByLabelText(/^Password$/i), 'pass');
    userEvent.type(await screen.findByLabelText(/Confirm password/i), 'passw');
    userEvent.click(await screen.findByRole('button', { name: /Sign up/i }));
    expect(await screen.findByText(/From 3 to 20 symbols/i)).toBeVisible();
    expect(await screen.findByText(/At least 6 symbols/i)).toBeVisible();
    expect(await screen.findByText(/Passwords must match/i)).toBeVisible();
  });
});

describe('chat', () => {
  beforeEach(async () => {
    server.use(
      rest.post('/api/v1/login', mockSingin),
      rest.get('/api/v1/data', mockInitialData),
    );
    userEvent.type(await screen.findByLabelText(/Nickname/i), 'user');
    userEvent.type(await screen.findByLabelText(/Password/i), 'pass');
    userEvent.click(await screen.findByRole('button', { name: /Log in/i }));
    await screen.findByTestId('new-message');
  });

  test('messaging', async () => {
    userEvent.type(await screen.findByTestId('new-message'), 'hello');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    expect(await screen.findByText(/hello/i)).toBeInTheDocument();
  });

  test('different channels', async () => {
    userEvent.type(await screen.findByTestId('new-message'), 'message for general');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    expect(await screen.findByText(/message for general/i)).toBeInTheDocument();
    userEvent.click(await screen.findByRole('button', { name: /random/i }));
    expect(screen.queryByText(/message for general/i)).not.toBeInTheDocument();
    userEvent.type(await screen.findByTestId('new-message'), 'message for random');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    expect(await screen.findByText(/message for random/i)).toBeInTheDocument();
  });

  test('adding channel', async () => {
    userEvent.click(await screen.findByRole('button', { name: '+' }));
    userEvent.type(await screen.findByTestId('add-channel'), 'test channel');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    expect(await screen.findByRole('button', { name: /test channel/i })).toBeInTheDocument();
  });

  test('adding channel with existing name', async () => {
    userEvent.click(await screen.findByRole('button', { name: '+' }));
    userEvent.type(await screen.findByTestId('add-channel'), 'random');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    await waitFor(async () => {
      expect(await screen.findByTestId('invalid-feedback')).toBeInTheDocument();
    });
  });

  test('renaming channel', async () => {
    userEvent.click(await screen.findByRole('button', { name: '+' }));
    userEvent.type(await screen.findByTestId('add-channel'), 'test channel');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    userEvent.click(await screen.findByTestId('dropdown'));
    expect(await screen.findByText(/Rename/i)).toBeInTheDocument();
    userEvent.click(await screen.findByRole('button', { name: /Rename/i }));
    userEvent.type(await screen.findByTestId('rename-channel'), 'renamed channel');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    expect(await screen.findByRole('button', { name: /renamed channel/i })).toBeInTheDocument();
  });

  test('renaming channel to an existing name', async () => {
    userEvent.click(await screen.findByRole('button', { name: '+' }));
    userEvent.type(await screen.findByTestId('add-channel'), 'test channel');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    userEvent.click(await screen.findByTestId('dropdown'));
    userEvent.click(await screen.findByRole('button', { name: /Rename/i }));
    userEvent.type(await screen.findByTestId('rename-channel'), 'general');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    await waitFor(async () => {
      expect(await screen.findByTestId('invalid-feedback')).toBeInTheDocument();
    });
  });

  test('removing channel', async () => {
    userEvent.click(await screen.findByRole('button', { name: '+' }));
    userEvent.type(await screen.findByTestId('add-channel'), 'test channel');
    userEvent.click(await screen.findByRole('button', { name: /Send/i }));
    expect(await screen.findByRole('button', { name: /test channel/i })).toBeInTheDocument();
    userEvent.click(await screen.findByTestId('dropdown'));
    expect(await screen.findByText(/Delete/i)).toBeInTheDocument();
    userEvent.click(await screen.findByRole('button', { name: /Delete/i }));
    expect(await screen.findByTestId('remove-button')).toBeInTheDocument();
    userEvent.click(await screen.findByTestId('remove-button'));
    await waitFor(() => {
      expect(screen.queryByText('test channel')).not.toBeInTheDocument();
    });
  });
});
