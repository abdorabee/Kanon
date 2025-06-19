# Kanon - AI-Powered Legal Assistant

Kanon is an advanced AI-powered legal assistant designed to revolutionize legal workflows for professionals in the legal industry. By leveraging cutting-edge technology, Kanon streamlines legal research, document analysis, and case strategy development.

![Kanon Legal Assistant](public/images/background.jpg)

## Features

### 🔍 Advanced Legal Research
Quickly access and analyze relevant legal information from a vast database of cases, statutes, and regulations.

### 📄 Document Analysis
Efficiently review and extract key insights from legal documents, contracts, and briefs.

### 📊 Case Strategy
Develop effective case strategies with AI-driven insights and predictive analytics.

## Technology Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS 4
- **Animation**: Motion
- **Development**: TypeScript
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/kanon.git
   cd kanon
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Create a `.env` file in the root directory with necessary environment variables (if any).

### Running the Application

#### Development Mode

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

#### Production Build

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

Start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

### Docker Deployment

The application can also be run using Docker:

1. Build the Docker image:
   ```bash
   docker build -t kanon .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 kanon
   ```

## Project Structure

- `/src/app`: Main application code
  - `/components`: UI components
  - `/lib`: Utility functions and libraries
  - `/api`: API routes
  - `/response`: Response handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Built with ❤️ for the legal community
