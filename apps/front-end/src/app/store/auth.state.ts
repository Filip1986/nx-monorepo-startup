import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetUsername } from './auth.actions';

export interface AuthStateModel {
  username: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    username: '',
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static getUsername(state: AuthStateModel): string {
    return state.username;
  }

  @Action(SetUsername)
  setUsername(ctx: StateContext<AuthStateModel>, action: SetUsername): void {
    const state: AuthStateModel = ctx.getState();
    ctx.setState({
      ...state,
      username: action.payload,
    });
  }
}
