import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import AddPost from "./components/AddPost/AddPost";
import {AuthContext} from "./contexts/AuthContext";
import {useState} from "react";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import EditUser from "./components/EditUser/EditUser";
import EditPost from "./components/EditPost/EditPost";
import Logout from "./components/Logout/Logout";

function App() {

    const [userData, setUserData] = useState({
        username: '',
        userId: '',
        userToken: '',
        profilePicPublicId: ''
    });

    const login = (userData) => {
        setUserData(userData);
    }

    const logout = () => {
        setUserData({
            username: '',
            userId: '',
            userToken: '',
            profilePicPublicId: ''
        });
    }

    return (
        <AuthContext.Provider value={{userData,isAuthorized:Boolean(userData.userId) , login, logout}}>
            <div className="App">
                <Header/>

                <main role="main">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/profile/:userId" element={<Profile/>}/>
                        <Route path="/profile/:userId/edit" element={<EditUser/>}/>
                        <Route path="/details/:postId/edit" element={<EditPost/>}/>
                        <Route path="/details/:postId" element={<Details/>}/>
                        <Route path="/post" element={<AddPost/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                    </Routes>
                </main>

                <script src="../public/assets/js/app.js"></script>
                <script src="../public/assets/js/theme.js"></script>

                <Footer/>

            </div>
        </AuthContext.Provider>
    );
}

export default App;
