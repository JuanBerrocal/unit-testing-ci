import React from 'react';
import { Credential, User } from './model';
import * as api from './api';

export const useLogin = () => {
  const [credential, setCredential] = React.useState<Credential>({name: '', password: '', });
  const [user, setUser] = React.useState<User>(null);

  const onLogin = () => {
    api.login(credential).then((response) => setUser(response));
  }

  return {
    credential,
    setCredential,
    user,
    onLogin
  };
};
