// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockedSocket from 'socket.io-mock';

// import init from '@hexlet/code';

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
//
//   global.localStorage.clear();
//   socket.socketClient.volatile = { emit: socket.socketClient.emit.bind(socket.socketClient) };
//   const vdom = await init(socket.socketClient);
//   render(vdom);
//   userEvent.click(await screen.findByText(/Hexlet Chat/i));
});

afterEach(() => {
  server.resetHandlers();
});

describe('auth', () => {
  test('login page on enter as guest', async () => {
    expect(window.location.pathname).toBe('/login');
    expect(await screen.findByLabelText(/Ваш ник/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Пароль/i)).toBeInTheDocument();
  });

  test('handle login error', async () => {
    server.use(rest.post('/api/v1/login', (_req, res, ctx) => res(ctx.status(401))));
    expect(screen.queryByText(/Неверные имя пользователя или пароль/i)).not.toBeInTheDocument();
    userEvent.type(await screen.findByLabelText(/Ваш ник/i), 'guest');
    userEvent.type(await screen.findByLabelText(/Пароль/i), 'pass');
    userEvent.click(await screen.findByRole('button', { name: /Войти/i }));

    expect(await screen.findByText(/Неверные имя пользователя или пароль/i)).toBeInTheDocument();
  });

  test('successful login', async () => {
    server.use(
      rest.post('/api/v1/login', mockSingin),
      rest.get('/api/v1/data', mockInitialData),
    );

    userEvent.type(await screen.findByLabelText(/Ваш ник/i), 'user');
    userEvent.type(await screen.findByLabelText(/Пароль/i), 'pass');
    userEvent.click(await screen.findByRole('button', { name: /Войти/i }));

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

    userEvent.click(await screen.findByRole('link', { name: /Регистрация/i }));
    expect(true).toBe(true);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/signup');
    });
    userEvent.type(await screen.findByLabelText(/Имя пользователя/i), 'user');
    userEvent.type(await screen.findByLabelText(/^Пароль$/i), 'password');
    userEvent.type(await screen.findByLabelText(/Подтвердите пароль/i), 'password');
    userEvent.click(await screen.findByRole('button', { name: /Зарегистрироваться/i }));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  test('handle validation', async () => {
    userEvent.click(await screen.findByRole('link', { name: /Регистрация/i }));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/signup');
    });
    userEvent.type(await screen.findByLabelText(/Имя пользователя/i), 'u');
    userEvent.type(await screen.findByLabelText(/^Пароль$/i), 'pass');
    userEvent.type(await screen.findByLabelText(/Подтвердите пароль/i), 'passw');
    userEvent.click(await screen.findByRole('button', { name: /Зарегистрироваться/i }));
    expect(await screen.findByText(/От 3 до 20 символов/i)).toBeVisible();
    expect(await screen.findByText(/Не менее 6 символов/i)).toBeVisible();
    expect(await screen.findByText(/Пароли должны совпадать/i)).toBeVisible();
  });
});

describe('chat', () => {
  beforeEach(async () => {
    server.use(
      rest.post('/api/v1/login', mockSingin),
      rest.get('/api/v1/data', mockInitialData),
    );
    userEvent.type(await screen.findByLabelText(/Ваш ник/i), 'user');
    userEvent.type(await screen.findByLabelText(/Пароль/i), 'pass');
    userEvent.click(await screen.findByRole('button', { name: /Войти/i }));
    await screen.findByTestId('new-message');
  });

  test('messaging', async () => {
    userEvent.type(await screen.findByTestId('new-message'), 'hello');
    userEvent.click(await screen.findByRole('button', { name: /Отправить/i }));
    expect(await screen.findByText(/hello/i)).toBeInTheDocument();
  });

  test('different channels', async () => {
    userEvent.type(await screen.findByTestId('new-message'), 'message for general');
    userEvent.click(await screen.findByRole('button', { name: /Отправить/i }));
    expect(await screen.findByText(/message for general/i)).toBeInTheDocument();
    userEvent.click(await screen.findByRole('button', { name: /random/i }));
    expect(screen.queryByText(/message for general/i)).not.toBeInTheDocument();
    userEvent.type(await screen.findByTestId('new-message'), 'message for random');
    userEvent.click(await screen.findByRole('button', { name: /Отправить/i }));
    expect(await screen.findByText(/message for random/i)).toBeInTheDocument();
  });

  test('adding channel', async () => {
    userEvent.click(await screen.findByRole('button', { name: '+' }));
    userEvent.type(await screen.findByTestId('add-channel'), 'test channel');
    userEvent.click(await screen.findByRole('button', { name: /Отправить/i }));
    expect(await screen.findByRole('button', { name: /test channel/i })).toBeInTheDocument();
  });
});
