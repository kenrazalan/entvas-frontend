# Task Management Application

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS. This application allows users to create, edit, delete, and manage tasks with approval workflows.

## Features

- **User Authentication**: Secure login and signup functionality with email/password
- **Task Management**: 
  - Create, edit, and delete tasks
  - Assign tasks to team members
  - Track task status (Pending, In Progress, Completed)
  - Send tasks for approval via email
- **Responsive Design**: 
  - Mobile-first approach
  - Optimized for all screen sizes
  - Touch-friendly interface
- **Modern UI**: 
  - Clean, intuitive interface
  - Smooth animations and transitions
  - Dark mode support
  - Accessible components

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - shadcn/ui for pre-built components
  - CSS Variables for theming
- **State Management**: React Query for server state
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Components**: 
  - Radix UI primitives
  - Custom components
- **Development Tools**:
  - ESLint for code linting
  - TypeScript for type safety
  - PostCSS for CSS processing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── assets/         # Static assets like images
├── components/     # Reusable UI components
│   ├── UI/         # Base UI components (buttons, inputs, etc.)
│   └── modals/     # Modal components for tasks
├── constants/      # Application constants and configurations
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── lib/            # Utility functions and helpers
├── pages/          # Page components
├── routes/         # Route definitions
├── services/       # API services
├── store/          # State management
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## Usage

### Authentication

1. Sign up with your email and password
2. Log in to access your dashboard

### Managing Tasks

- **Create a Task**: 
  - Click the "Create Task" button
  - Fill in task details (title, description, assignee)
  - Submit the form

- **Edit a Task**: 
  - Click the edit icon on a task
  - Modify task details
  - Save changes

- **Delete a Task**: 
  - Click the delete icon
  - Confirm deletion

- **Send for Approval**: 
  - For pending tasks, click the email icon
  - System will send an approval request email

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

### Code Style

This project uses ESLint and Prettier for code formatting. Run the linter before committing changes:

```bash
npm run lint
```

## Deployment

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to your hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Vite](https://vitejs.dev/) 