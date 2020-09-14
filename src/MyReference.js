import React, { useContext } from 'react';
/*Context API in functional components.
1-in src folder create (context) folder    2-create userContext.js file.   3-Provide this in a top component

*/
//in userContext.js we create our context object.
const UserContext = React.createContext();
export default UserContext;

class App extends Component {
    state = { currentUser: { name: null } }
    hadleLoggedIn = (username) => {
        console.log('Getting the current user' + username); //simulate calling the server to get info about current user
        const user = { name: 'Mosh' }; //imagine we got a user from ther server with name set to Mosh
        this.useState({ currentUser: { name: 'Mosh' } }) //we set our current user to the user we get from the server
    } //now we have a method for updating the state, we should pass this mehtod, like current user using our context object


    render() {
        return (<UserContext.Provider value={{
            currentUser: this.state.currentUser,
            onLoggedIn: this.hadleLoggedIn
        }}>
            <div> <MoviePage /> 
            <Login />
            </div>
        </UserContext.Provider>);
    } //now we have created our provider then we will conusme it somewhere in our components tree.
} export default App;


import UserContext from './userContext';
function MovieRow(props) {
    const userContext = useContext(UserContext); //this returns our UserContext object which is the current user.

    return (<div>MovieRow {useContext.currentUser ? useContext.currentUser.name : ""} </div>);
export default MovieRow;

//to update the context let's add a Login.js in context foler
import React from 'react';

function Login(props) {
    const userContext = useContext(UserContext);
    return (
        <button onClick={() => userContext.onLoggedIn("User Name...")}>Login</button>
        //whern the user clicks on this button the handleLoggedIn  in the App component gets executed
    );
}
}
export default Login;



/*if [input] function is the same the arrow function will not be called!
so this argument determines whether or not to make an api call, if we not pass the second array 
this useEffect funcion is going to be called every single time our component rerenders!!!! */

/*useEffect(() => {
    effect
}, [])          this empty array is our signal to useEffect that we passing a funciton that will be invoked only one time
                the very first time our coponent gets rendered.

                useEffect(() => {}, [1]) --> useEffect(() => {}, ['hi']); our function will be calld

                useEffect(() => [{color: 'red'}])  --> useEffect(() => [{color: 'red'}]);  -->--> called!!!!!!

                useEffect(() => ,[10, 10])  --> useEffect(() => ,[10, 10]) will be called

you can't use asyncrouns funciotn inside useEffect!!!
so this is the syntaxt to implemtn that

                
*/
//The whole idea behind custom hooks is just so that we can extract component logic into reusable functions.
const useFetch = (url, options) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          setResponse(json);
          setIsLoading(false)
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { response, error, isLoading };
    };
    
//Simulatenous DATA
function getData () {
    axios.all([
        axios.get('/todos'),
        axios.get('/posts')
    ])
    .then(res => {  //axios.spread((todos, posts) => showOutpu(posts))
        console.log(res[0]);
        console.log([res[1]])
    })
    .catch(err => console.log(err))
}
