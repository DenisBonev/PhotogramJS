import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import DetailsPortrait from "./components/DetailsPortrait/DetailsPortrait";
import AddPost from "./components/AddPost/AddPost";
import {AuthContext} from "./contexts/AuthContext";
import {useState} from "react";

function App() {

    const [userData,setUserData] = useState({
        username: '',
        objectId: '',
        'user-token': '',

    });

    const onLogin = (userData) => {
        setUserData(userData);
    }

    return (
        <AuthContext.Provider value={true}>
            <div className="App">
                <Header username={userData.username}/>

                <main role="main">
                    <Routes>
                        <Route path="/" element={<AddPost/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login onLogin={onLogin}/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/details" element={<DetailsPortrait/>}/>
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
