import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SongScreen from './screens/SongScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import NewPlaylistScreen from './screens/NewPlaylistScreen';
import ViewPlaylistScreen from './screens/ViewPlaylistScreen';

function App() {
    return (
        <React.Fragment>
            <ToastContainer />
            <Router>
                <Header />
                <main className='py-3'>
                    <Container>
                        <Switch>
                            <Route path='/songs' component={SongScreen} />
                            <Route
                                path='/playlists/create'
                                component={NewPlaylistScreen}
                            />
                            <Route
                                path='/playlists/:id'
                                component={ViewPlaylistScreen}
                            />
                            <Route
                                path='/playlists'
                                exact
                                component={PlaylistScreen}
                            />
                            <Route path='/login' component={LoginScreen} />
                            <Route
                                path='/register'
                                component={RegisterScreen}
                            />
                            <Route path='/' exact component={HomeScreen} />
                            <Route
                                path='/not-found'
                                component={NotFound}></Route>
                            <Redirect to='/not-found' />
                        </Switch>
                    </Container>
                </main>
                <Footer />
            </Router>
        </React.Fragment>
    );
}

export default App;
