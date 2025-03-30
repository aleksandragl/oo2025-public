import { Sportsperson } from "./Sportsperson";
export type Result = {
    id: number,
    event: string,
    value: number,
    points: number
    sportsperson?: Sportsperson;
}