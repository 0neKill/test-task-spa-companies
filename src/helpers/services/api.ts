import { Company, Employee, Mode } from '../../__types__';
import axios, { AxiosResponse } from 'axios';
import { ThunkArg } from '../../store/thunks';


const $api = axios.create({
    baseURL: '/data/',
});


export const RequestData = {
    [Mode.COMPANIES]: {
        uri: 'companies.json',
    },
    [Mode.EMPLOYEES]: {
        uri: 'employees.json',
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
    async query(arg: ThunkArg, offset: number, limit: number): Promise<AxiosResponse<Company[] | Employee[]>> {
        const _request = RequestData[arg.entryPoint];
        const { data } = await $api.get(_request.uri);
        if (arg.entryPoint === 'employees') {
            return data[arg.id];
        }
        await delay(1000);
        return data;
        // return data.slice(offset, limit);
    };
}

export const api = new Api();