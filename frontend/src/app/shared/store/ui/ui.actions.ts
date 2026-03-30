import { createAction, props } from '@ngrx/store';

export const initTheme = createAction('[UI] Init Theme', props<{ isDarkTheme: boolean }>());

export const toggleTheme = createAction('[UI] Toggle Theme');

export const toggleThemeSuccess = createAction(
  '[UI] Toggle Theme Success',
  props<{ isDarkTheme: boolean }>(),
);

export const toggleThemeFailure = createAction(
  '[UI] Toggle Theme Failure',
  props<{ error: string }>(),
);
