import { Button } from "./components/Button"
import { Card } from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  return <div className="p-4">
    <div className="flex justify-end gap-4">
      <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>
      <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
    </div>
    <div className="flex gap-4">
      <Card title="first tweet" link="https://x.com/merishabh_singh/status/1912480424581882206" type="twitter"/>
      <Card title="first youtube" link="https://youtube.com/watch?v=MYyJ4PuL4pY" type="youtube"/>
    </div>
  </div>;
}

export default App;
