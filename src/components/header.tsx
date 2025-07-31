import type { State } from "@/state/auction.state"
import { Bike, Copy, Import } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { ThemeToggle } from "./theme/theme-toggle"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"

export default function Header({ getSerializedState, setState }: { getSerializedState: () => string; setState: (state: State) => void; }) {
  const [importJsonString, setImportJsonString] = useState("")
  const [importDialogOpen, setImportDialogOpen] = useState(false)

  const onCopyStateClicked = () => {
    const string = getSerializedState()
    navigator.clipboard.writeText(string)
    toast.success("Tsjak gekopieerd")
  }

  const onSetStateClicked = async () => {
    try {
      const state = JSON.parse(importJsonString) as State
      setState(state)

      toast.success("Tsjak geïmporteerd")
      setImportDialogOpen(false)
      setImportJsonString("")
    } catch {
      toast.error("Nie gelukt helaas")
    }
  }

  return (
    <>
      <div className="p-8">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bike />
              <h1 className="text-2xl font-bold">
                Lekker veilen zonder met elkaar te hoeven praten
              </h1>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => onCopyStateClicked()} variant="outline">
                <Copy /> Kopieer tsjak
              </Button>
              <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <form>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Import />
                      Importeer tsjak
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Importeer tsjak</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Input id="input" name="input" value={importJsonString} onChange={e => setImportJsonString(e.target.value)} />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Laat ook maar</Button>
                      </DialogClose>
                      <Button onClick={() => onSetStateClicked()} type="submit">Importeer</Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}