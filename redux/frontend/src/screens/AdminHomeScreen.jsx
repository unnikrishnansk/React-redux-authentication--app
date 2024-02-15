import React,{ useState } from 'react';
import { useSelector } from 'react-redux';

const AdminHomeScreen = () => {

  const [searchText,setSearchText] = useState('');
  const [filterData,setFilterData] = useState([]);

  const { userInfo } = useSelector((state)=> state.auth);

  const filteredData = (searchText,userData) => {
    const filteredData = userData.filter((data) =>
    data?.name?.toLowerCase().includes(searchText.toLowerCase())
  );
  return filteredData;
}

  return (
    <>
<h2 className=''>Admin Home Page</h2>

<input 
        className='searchbar' 
        type="text" 
        placeholder="Search Items.." 
        value={searchText}
        onChange={(e)=>{
          console.log(e.target.value);
            setSearchText(e.target.value);
        }} 
        />
        <button onClick={()=>{
            const data = filteredData(searchText,userInfo?.users);
            setFilterData(data)
            console.log(data);
        }}>Search</button>

<table className="table">
  <thead>
    <tr>
      <th scope="col">Index</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody >
    {userInfo?.users && userInfo.users.map((user,index)=>{
      return (<tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
      )
     })} 
    
  </tbody>
</table>
    </>
    
  )
}

export default AdminHomeScreen