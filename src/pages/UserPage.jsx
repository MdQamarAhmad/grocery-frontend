import { useState } from "react";

function UserPage() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!item.trim()) return;
    
  await fetch(`${import.meta.env.VITE_API_URL}/submit`,{
  method: "POST",
  headers: {
    "Content-Type": "application/json", 
  },
  body: JSON.stringify({item}), 
})
  .then((res) => res.json())
  .catch((error) => {
    console.error("Error:", error);
  });
  console.log("lists",...list);
    setList([...list, item]);
    setItem(""); // clear input
  };

 async function fetchItems(){
   let res = await fetch(import.meta.env.VITE_API_URL);
     let data = await res.json();
     console.log(data);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🛒 Grocery List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter grocery item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 15px" }}>
          Add
        </button>
      </form>
<br />
   <button onClick={fetchItems}>click me</button>

      <ul style={{ marginTop: "20px" }}>
        {list.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserPage;
