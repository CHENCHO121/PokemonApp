import './CSS/login.css';
import { useState } from "react";

function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    let [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});

    const signup = () => {
        let id = Date.now();
        if(email === "" || password === "") {
            alert('Please fill all the details correctly. Thanks');
            return;
        }
        let obj = {id, email, password};
        users.push(obj);
        setUsers(users);
        setCurrentUser(obj);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(obj));
        window.location.reload();
    }
    
    const login = () => {
        let alreadExists = users.find(elem => elem.email === email);
        if(!alreadExists) {
            alert('User not found with this email.');
            return;
        }
        alreadExists = users.find(elem => elem.email === email && elem.password === password);
        if(!alreadExists) {
            alert('Incorrect Password.');
            return;
        }
        if(alreadExists) {
            setCurrentUser(alreadExists);
            localStorage.setItem('currentUser', JSON.stringify(alreadExists));
            window.location.href = '/';
        }
    }

    const logout = () => {
        setCurrentUser({});
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-10">
                    <h1>Pokemons Management App</h1>
                    <p>This is an online app for the pokemons data. You can either watch new pokemons, 
                        search them with type and regions and like them. You can see the liked pokemons
                        in the next page. You need to login first if you want to use this app. Signup 
                        please if you are new here. Thanks. Enjoy! 
                    </p>
                </div>
                {currentUser.email && <div className="col-2">
                    <button className='btn btn-outline-danger mt-3' onClick={logout}>Logout</button>
                </div>}
            </div>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">
                        Login
                    </button>
                    <button type="button" className="btn btn-primary ml-3" data-toggle="modal" data-target="#signupModel">
                        Signup
                    </button>
                </div>
            </div>
        </div>
       
            {/* Login Rodal */}
           

            <div className="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login here</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label>Email</label>
                                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />

                                <label>Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="signupModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Signup here</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label>Email</label>
                                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />

                                <label>Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </form>
                         </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={signup}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;