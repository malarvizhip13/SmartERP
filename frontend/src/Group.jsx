import { useState, useEffect } from "react";

function Group() {
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("");
  const [description, setDescription] = useState("");
  const [groups, setGroups] = useState([]);

  const saveGroup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group_name: groupName,
        group_type: groupType,
        description,
      }),
      
    });
    const data = await res.json();
console.log(data);

fetchGroups(); 

    setGroupName("");
    setGroupType("");
    setDescription("");
  };

  // 📄 Get Groups
  const fetchGroups = async () => {
    const res = await fetch("http://localhost:5000/api/groups");
    const data = await res.json();
    setGroups(data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div>
      <h2>Group Management</h2>

      {/* FORM */}
      <form onSubmit={saveGroup}>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <br /><br />

        <select
          value={groupType}
          onChange={(e) => setGroupType(e.target.value)}
        >
          <option value="">Select Group Type</option>
          <option value="Customer">Customer</option>
          <option value="Supplier">Supplier</option>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">Save Group</button>
      </form>


      <h3>Group List</h3>

      {groups.length === 0 ? (
        <p>No Groups Found</p>
      ) : (
        groups.map((group) => (
          <div
            key={group.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{group.group_name}</h4>
            <p>Type: {group.group_type}</p>
            <p>{group.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Group;