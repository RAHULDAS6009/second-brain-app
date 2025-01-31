import { Button } from "./components/Button";

function App() {
  return <>
    <Button text={"Share"} variant="primary" size="sm" onClick={()=>console.log("hello world 1")}/>
    <Button text={"Share"} variant="secondary" size="lg" onClick={()=>console.log("hello world 2")}/>
  </>;
}

export default App;
