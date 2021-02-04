import { observable, reaction, computed } from 'mobx';
import { Quotes } from './quotes';

export interface IStore {
  quotes: Quotes;
}

class Store {
  @observable data: IStore = {
    quotes: new Quotes()
  };

  constructor() {
    reaction(
      () => Object.keys(this.data).filter(d => d !== undefined),
      data => console.log(data)
    )
  }

  @computed
  get quotes(): Quotes {
    return this.data.quotes;
  }

}

export const store = new Store();