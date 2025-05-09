import { Manager } from "./Manager";


export interface Word {
    typeId: number;      
    type: string;       
    description: string; 
    manager?: Manager;   
  }
  