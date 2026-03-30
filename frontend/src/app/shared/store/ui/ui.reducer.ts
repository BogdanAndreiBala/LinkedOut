import { createReducer, on } from '@ngrx/store';
import { initTheme, toggleThemeSuccess } from './ui.actions';
import { initialUiState } from './ui.state';

export const uiReducer = createReducer(
  initialUiState,

  on(initTheme, (state, { isDarkTheme }) => ({ ...state, isDarkTheme })),

  on(toggleThemeSuccess, (state, { isDarkTheme }) => ({ ...state, isDarkTheme })),
);
