// Add your TypeScript type definitions here
export type Route = {
  path: string;
  element: React.ReactNode;
  children?: Route[];
}; 