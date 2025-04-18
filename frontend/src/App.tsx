import { Button } from "./components/Button"
import { Card } from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  return <div className="flex justify">
    <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>
    <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
    
    <Card title="first tweet" link="https://x.com/merishabh_singh/status/1912480424581882206" type="twitter"/>
    <Card title="first youtube" link="http://youtube.com/watch?v=MYyJ4PuL4pY&t=381s" type="youtube"/>
  </div>;
}

export default App;
