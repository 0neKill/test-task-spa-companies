import { Employee } from './employee';

export interface Company {
    id: string,
    name: string,
    total_count: number,
    address: string,
    employees: Employee[],
}