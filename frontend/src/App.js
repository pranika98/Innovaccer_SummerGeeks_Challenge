import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Confirmation from "./pages/Confirmation";
import Checkout from "./pages/Checkout";

function App() {
    return (
        <div className='App'>
            <div style={{ padding: 0 }}>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/confirmation"
                            component={Confirmation}
                        />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/" component={Index} />
                        <Route exact path="/checkout" component={Checkout} />
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
