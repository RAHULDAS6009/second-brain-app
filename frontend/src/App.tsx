import { Button } from "./components/Button"
import { Card } from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  return <div className="flex justify">
    <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>
    <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
    
  </div>;
}

export default App;
