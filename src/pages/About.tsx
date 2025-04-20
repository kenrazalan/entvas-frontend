import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Lorem ipsum Lorem ipsum</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lorem ipsum</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipiscing elit.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.
          </p>
          <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Lorem ipsum</CardTitle>
          <CardDescription>Lorem ipsum Lorem ipsum</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Lorem ipsum dolor sit amet consectetur adipiscing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipiscing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipiscing elit.</li>

          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 