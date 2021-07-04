import logo from './ethereum.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World!
        </p>
        <p>
          Welcome to my Blank Crypto Internship project!
        </p>
        <div className="App-link-container">
          <a
            className="App-link"
            href="https://github.com/Vujo33666"
            target="_blank"
            rel="noopener noreferrer"
          >
            My GitHub
          </a>
          <a
            className="App-link"
            href="https://www.linkedin.com/in/marko-vujnovi%C4%87-95b4a4214/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Linkedin
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
