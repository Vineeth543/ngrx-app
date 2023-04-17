import { createReducer, on, Action } from '@ngrx/store';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action';
import { AuthStateInterface } from '../types/authState.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(registerFailureAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
  }))
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
