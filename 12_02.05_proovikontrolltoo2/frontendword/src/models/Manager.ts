import { Word } from "./Word";


export interface Manager {
    id: number;          
    name: string;        
    words: Word[];      
  }
  