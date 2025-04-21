import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Component Test Page</h1>
      
      <div className="space-y-8">
        {/* Button Examples */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Button Examples</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔍</Button>
          </div>
        </section>

        {/* Input Examples */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Input Examples</h2>
          <div className="space-y-4 max-w-sm">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Enter your email" />
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Enter your password" />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" placeholder="This input is disabled" disabled />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 