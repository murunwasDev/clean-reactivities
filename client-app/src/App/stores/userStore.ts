import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Utils } from '../common/utils/utils';
import { User, UserFormValues } from '../models/interfaces/user';
import { store } from './store';

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !Utils.isNullOrUndefined(this.user);
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = async () => {
    store.commonStore.setToken(null);
    this.user = null;
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.error(error);
    }
  };
}
