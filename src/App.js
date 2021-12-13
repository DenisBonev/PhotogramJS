import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import {Routes, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import DetailsPortrait from "./components/DetailsPortrait/DetailsPortrait";
import AddPost from "./components/AddPost/AddPost";

function App() {
    return (
        <div className="App">
            <Header/>

            <main role="main">
                <Routes>
                    <Route path="/" element={<AddPost/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/details" element={<DetailsPortrait/>}/>
                </Routes>
            </main>

            <script src="../public/assets/js/app.js"></script>
            <script src="../public/assets/js/theme.js"></script>

            <Footer/>

        </div>
    );
}

export default App;
