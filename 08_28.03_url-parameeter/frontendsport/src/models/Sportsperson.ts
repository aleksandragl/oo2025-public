import { Result } from "./Result";

export type Sportsperson = {
    id: number,
    name: string,
    country: string,
    age: number
    results?: Result[];
    totalPoints?: number;
}