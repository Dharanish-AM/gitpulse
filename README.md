# GitPulse

**The Pulse of your Codebase.**
Visualize, Analyze, and Optimize your development workflow.

![GitPulse Banner](/dashboard.png)

## Overview

GitPulse is a developer-focused dashboard that allows you to visualize your GitHub activity, analyze your coding patterns, and optimize your workflow. Built with a modern "Cyberpunk" aesthetic, it provides a premium user experience with deep insights into your repositories.

## Features

- **GitHub OAuth Integration**: Securely sign in with your GitHub account.
- **Repository Visualization**: Interactive graphs and charts representing your commit history and branch structure.
- **Developer Statistics**: Detailed breakdown of languages, commit frequency, and contribution health.
- **Modern UI**: A fully responsive, dark-mode first interface built with TailwindCSS and Framer Motion.
- **Privacy Focused**: We only access what's necessary. Check our [Privacy Policy](/app/privacy/page.tsx).

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **API**: [Octokit](https://github.com/octokit/octokit.js)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- A GitHub OAuth App (Client ID and Secret)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/gitpulse.git
    cd gitpulse
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and add your GitHub OAuth credentials:

    ```env
    # GitHub OAuth
    GITHUB_CLIENT_ID=your_client_id
    GITHUB_CLIENT_SECRET=your_client_secret_secret
    NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id

    # App URL (Authentication Redirect)
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the app.

## Legal

- [Privacy Policy](./app/privacy/page.tsx)
- [Terms of Service](./app/terms/page.tsx)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## License

This project is licensed under the MIT License.
