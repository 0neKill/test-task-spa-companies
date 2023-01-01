export interface ITableHead {
    id: number,
    name: 'Компания' | 'Кол-во' | 'Адрес' | 'Фамилия' | 'Имя' | 'Должность';
    className: 'one' | 'two' | 'three';
}

export const TableHeadCompanies: ITableHead[] = [
    {
        id: 1,
        name: 'Компания',
        className: 'one',
    },
    {
        id: 2,
        name: 'Кол-во',
        className: 'two',
    },
    {
        id: 3,
        name: 'Адрес',
        className: 'three',
    },
];

export const TableHeadEmployees: ITableHead[] = [
    {
        id: 1,
        name: 'Фамилия',
        className: 'one',
    },
    {
        id: 2,
        name: 'Имя',
        className: 'two',
    },
    {
        id: 3,
        name: 'Должность',
        className: 'three',
    },
];