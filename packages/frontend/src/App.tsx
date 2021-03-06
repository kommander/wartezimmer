import "./app.css";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// https://github.com/PaulLeCam/react-leaflet/issues/453
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

import { Layout } from "antd";
import { About } from "components/About";
import { Enqueue } from "components/Enqueue";
import { NavBar } from "components/NavBar";
import { Queue } from "components/Queue";
import { Sider } from "components/Sider";
import { Treatment } from "components/Treatment";
import { Wait } from "components/Wait";
import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { Step } from "state/app";
import { SnackbarProvider } from 'notistack';

import { Facility } from "./components/Facility";
import { GoodBye } from "./components/GoodBye";
import { Imprint } from "./components/Imprint";
import { Search } from "./components/Search";
import { Welcome } from "./components/Welcome";
import { State } from "./state";

export const App = () => {
    const activeStep = useSelector((state: State) => state.app.activeStep);

    function renderContent() {
        switch (activeStep) {
            case Step.Welcome:
                return <Welcome />;
            case Step.Search:
                return <Search />;
            case Step.Enqueue:
                return <Enqueue />;
            case Step.Facility:
                return <Facility />
            case Step.Imprint:
                return <Imprint />
            case Step.Queue:
                return <Queue />;
            case Step.Wait:
                return <Wait />;
            case Step.Treatment:
                return <Treatment />;
            case Step.GoodBye:
                return <GoodBye />;
            case Step.About:
                return <About />;
            default:
                return <div>Page not found {Step[activeStep]}</div>;
        }
    }

    return <>
        {/* <div id="smartphone"></div> */}
        {/* <img src="/images/phone.png" alt=""/> */}
        <Layout className="full-height" id="app">
            <SnackbarProvider maxSnack={3}>
                <NavBar />
                {renderContent()}
            </SnackbarProvider>
        </Layout>
        <Sider />
    </>
};

// TODO: Hot only in dev?
export default hot(module)(App);
