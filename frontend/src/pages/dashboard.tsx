import { Button } from "../components/Button"
import { Card } from "../components/Card";
import { useState } from "react";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Slidebar } from "../components/Slidebar";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return <div>
    <Slidebar />
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal open={modalOpen} onClose={() => { setModalOpen(false)}} />
      <div className="flex justify-end gap-4">
        <Button onClick={() => { setModalOpen(true) }}
        variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>
        <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
      </div>
      <div className="flex gap-4">
        <Card title="Rishabh's Tweet" link="https://x.com/merishabh_singh/status/1912480424581882206" type="twitter"/>
        <Card title="Laravel From Scratch" link="https://youtube.com/watch?v=MYyJ4PuL4pY" type="youtube"/>
      </div>
    </div>
  </div>;
}

