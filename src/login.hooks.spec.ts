import { renderHook, act, waitFor } from '@testing-library/react';
import * as api from './api';
import {Credential, User } from './model';
import { useLogin } from './login.hooks';


describe('useLogin specs', () => {
  it('Check that return credential with default values and a function setCredentials', () => {
    //Arrange

    //Act
    const {result} = renderHook(() => useLogin());

    //Assert
    expect(result.current.credential).toEqual({name: '', password: ''});
    expect(result.current.setCredential).toEqual(expect.any(Function));;
  });
  it('It should update the component when the state changes', () => {
    //Arrange
    const newCredential: Credential = {name: 'admin', password: 'test'};

    //Act
    const {result} = renderHook(() => useLogin());

    act(() => {result.current.setCredential(newCredential);});

    //Assert
    expect(result.current.credential).toEqual(newCredential);

  });
  it('At first the user is null', () => {
    //Arrange

    //Act
    const {result} = renderHook(() => useLogin());

    //Assert
    expect(result.current.user).toBeNull();

  });

  it('Should update user when login successfully', async () => {
    //Arrange
    const adminUser: User = {name:'admin', role:'admin'};
    const stub = jest.spyOn(api, 'login').mockResolvedValue(adminUser);

    //Act
    const {result} = renderHook(() => useLogin());
    act( () => {result.current.onLogin()} );


    //Assert
    expect(stub).toHaveBeenCalled();
    await waitFor(() => expect(result.current.user).toEqual(adminUser));

  });
});
