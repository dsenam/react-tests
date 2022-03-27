import { useState } from "react";

function App() {
  const [newItem, setNewItem] = useState('')
  const [list, setList] = useState(["Douglas", "Jéssica", "Gabriel"]);

  function addToList() {
    setTimeout(() => {
      setList((state) => [...state, newItem]);
    }, 500)
    
  }

  function removeFromList(item:string) {
    setTimeout(() => {
      setList((state) => state.filter(item => item !== item));
    }, 500)
  }

  return (
    <>
    <input placeholder="Novo Item" value={newItem} type="text" onChange={e=> setNewItem(e.target.value)}/>
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map(item => (
          <li key={item}>{item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
