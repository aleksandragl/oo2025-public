//rfce 
function Arrayd() {
  //const [count, setCount] = useState(0)
  const sonad = ["Elas", "metsas", "mutionu"];
  const autod = [
    {"mark": "BMW", "mudel": "i5", "year": 2015},
    {"mark": "Audi", "mudel": "TT", "year": 2017},
    {"mark": "Mersedes", "mudel": "S", "year": 2012},
    {"mark": "VW", "mudel": "Golf", "year": 2013}
  ];
    
  return (
    <div>
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
     
    </div>
  )
}

export default Arrayd