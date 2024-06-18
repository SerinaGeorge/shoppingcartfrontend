import React,{useEffect , useState}from "react"
import Footer from "../components/Footer"
import Navigation from "../components/Navigation";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export function Userlisting () {
    
    const navigate = useNavigate();
    const [userdata,setuserdata] = useState([]);

    const fetchdata = async() => {

     const accessToken = localStorage.getItem('token');
     console.log("Access Token -> ", accessToken)
     if (accessToken) {


    axios.defaults.headers.common['acess-token'] = `${accessToken}`;

await axios.get("http://localhost:3000/useradm/user").then((response) => {
 console.log(JSON.stringify(response.data));
 const userresult = response.data;
 setuserdata(userresult);
});
}
else{
 let path = `/login`;
     navigate(path);
}
}
const handleRowClick = (id) => {
alert(`Row with ID ${id} clicked`);
navigate(`/userdetails/${id}`);
};
 useEffect(() => {
     fetchdata();
},[]);

return (
 <>
   <Navigation />
   (<div className="container my-3 py-3">
     <h1 className="text-center">Users</h1>
     <hr />
     <table id ="users" className="table table-striped table-bordered">
         <tr>
             <th>User Name</th>
             <th> User Type</th>
         
         </tr>
         {userdata.map((row) => {
             return (
                 <tr key={row._id} onClick={() => handleRowClick(row._id)} className="clickable-row">
                     <td>{row.userName}</td>
                     <td>{row.usertype}</td>

    
                     
                 </tr>
             )
         })}
     </table>
 </div>);
 <Footer/>
 </>)
}
export default Userlisting;