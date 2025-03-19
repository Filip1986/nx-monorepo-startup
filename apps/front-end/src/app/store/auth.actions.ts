export class SetUsername {
  static readonly type = '[Auth] Set Username';
  constructor(public payload: string) {}
}
