import axios, { AxiosResponse } from 'axios';

import type { Company, Employee } from '../../__types__';
import type { ThunkArg } from '../../store/thunks';
import { EntryPoint } from '../../__types__';


const $api = axios.create({
    baseURL: '/data/',
});



export const RequestData = {
    [EntryPoint.COMPANIES]: {
        uri: 'companies.json',
    },
};
const delay = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    });
};

class Api {
    async query(arg: ThunkArg): Promise<AxiosResponse<Company[] | Employee[]>> {
        const _request = RequestData[arg.entryPoint];
        const { data } = await $api.get(_request.uri);
        await delay(1000);
        return data;
    };
}

export const api = new Api();