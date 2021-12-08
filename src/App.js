import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import DetailsPortrait from "./components/DetailsPortrait/DetailsPortrait";
import DetailsLandscape from "./components/DetailsLandscape/DetailsLandscape";

function App() {
    return (
        <div className="App">
            <Header/>

            <main role="main">

                {/*<Home/>*/}
                {/*<Register/>*/}
                {/*<Login/>*/}
                {/*<Profile/>*/}
                <DetailsPortrait/>
                {/*<DetailsLandscape/>*/}
            </main>

            <script src="../public/assets/js/app.js"></script>
            <script src="../public/assets/js/theme.js"></script>

            <Footer/>

        </div>
    );
}

export default App;
