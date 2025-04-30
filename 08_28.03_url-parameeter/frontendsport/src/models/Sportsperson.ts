import { Result } from "./Result";

export type Sportsperson = {
    id: number,
    name: string,
    country: string,
    age: number
    results?: Result[];  //--> masiiv //kas on või ei ole üldse 
    totalPoints?: number; //kas on või ei ole üldse 
}