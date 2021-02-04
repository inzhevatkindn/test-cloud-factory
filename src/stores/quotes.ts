import { observable, action, computed } from 'mobx';

export interface ITicker {
    name: string;
    last: number;
    highestBid: number;
    percentChange: number;
    id: string;
}

interface IQuotes {
    list_tickers: ITicker[];
}

export class Quotes implements IQuotes {
    @observable private _list_tickers: ITicker[] = [];

    @computed
    get list_tickers(): ITicker[] {
        return this._list_tickers;
    }
    set list_tickers(tickers: ITicker[]) {
        this._list_tickers = tickers;
    }

    @action 
    async returnTicker() {
        const response = await fetch('https://poloniex.com/public?command=returnTicker');
        if (!response.ok) {
            console.log(response.status);
            throw new Error('Error');
        } else {
            const data = await response.json();
            const tickerNames = Object.keys(data);
            this.list_tickers = tickerNames.map((name: string) => {
                const { last, highestBid, percentChange, id } = data[name];
                return { name, last, highestBid, percentChange, id };
            });
        }
    }
}