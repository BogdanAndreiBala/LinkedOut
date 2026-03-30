import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.state';

export const UI_FEATURE_KEY = 'ui';

export const selectUiState = createFeatureSelector<UiState>(UI_FEATURE_KEY);

export const selectIsDarkTheme = createSelector(selectUiState, (state) => state.isDarkTheme);
