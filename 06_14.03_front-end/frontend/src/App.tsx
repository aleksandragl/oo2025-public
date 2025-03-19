import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Category } from './models/Category';
import { Product } from './models/Product';

function App() {
  //const [count, setCount] = useState(0)
  const sonad = ["Elas", "metsas", "mutionu"];
  const autod = [
    {"mark": "BMW", "mudel": "i5", "year": 2015},
    {"mark": "Audi", "mudel": "TT", "year": 2017},
    {"mark": "Mersedes", "mudel": "S", "year": 2012},
    {"mark": "VW", "mudel": "Golf", "year": 2013}
  ];
  //muutuja HTML muudad muutujat + HTMLi sulgudes ees on algvaartus
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  //uef enter ->onload function
  useEffect(() => {
    fetch("http://localhost:8080/categories") //api otspunkt kuhu laheb paring
            .then(res=>res.json())
            .then(json=> setKategooriad(json)) //body:sisu mida tagastab meie backend 
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/products") //api otspunkt kuhu laheb paring
            .then(res=>res.json())
            .then(json=> setProducts(json)) //body:sisu mida tagastab meie backend 
  }, []);

  return (
    <>
      {/* <div>{7 + 7}</div>
      <div>7 + 7</div>
      <div>{kogus}</div>
      <div>{count}</div> */}
      {sonad.map(sona =>
       <div key={sona}>
        {sona}
       </div> )}
       <br />
       <br />
      {kategooriad.map(kategooria =>  
       <div key={kategooria.id}>
        {kategooria.name} {kategooria.active}
       </div> )}
       <br />
       <br />
      {products.map(product =>  
       <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category?.name}</div>
       {/* <div>{product.active}</div> */}
       </div> )}
    </>
  )
}

export default App
