import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import App from '../App';

describe('Página de Login', () => {
  it('Deve redirecionar para a rota "/Game" quando for inserido um nome e um email válido e o botão "Play" for clicado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputNameElement = screen.getByTestId('input-player-name');
    userEvent.type(inputNameElement, 'Player Name');

    const inputEmailElement = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmailElement, 'player@email.com');

    const playButtonElement = screen.getByTestId('btn-play');
    userEvent.click(playButtonElement);

    await waitFor(() => expect(history.location.pathname).toBe('/Game'));
  });

  it('Deve redirecionar para rota "/Settings" quando o botão "Settings" for clicado', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButtonElement = screen.getByTestId('btn-settings');
    userEvent.click(settingsButtonElement);

    expect(history.location.pathname).toBe('/Settings');
  });
});
