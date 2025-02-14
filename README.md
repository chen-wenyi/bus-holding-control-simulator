## 1. Development with VSCode Dev Containers 🐳

To streamline development and ensure a consistent environment, we recommend using VSCode Dev Containers. This setup allows you to start coding instantly without worrying about dependencies.

Why use Dev Containers?

✅ Pre-configured development environment

✅ No need to install dependencies locally

✅ Works across different operating systems

✅ Seamless integration with VSCode

### Getting Started

1. Install Prerequisites
   - Visual Studio Code
   - Docker
   - VSCode Extensions: **Dev Containers**
2. Clone the Repository

3. Open in VSCode

   - Open the project in VSCode.
   - When prompted, click R**eopen in Container**.
   - If not prompted, open the Command Palette (Ctrl + Shift + P / Cmd + Shift + P) and select: **Dev Containers: Reopen in Container**

4. Start Coding! 🚀

## 2. How to start the application in local environment? 🛠️

### Install dependency locally

pnpm install

### Getting Started

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can add a section in your README like this:

## 3. Continuous Deployment with Vercel 📦

This project is configured for CI/CD with Vercel. Every time you merge code into the main branch, a build and deployment process is automatically triggered, ensuring that the latest changes are live without manual intervention.

Deployment Process 1. Push or merge code into the main branch. 2. Vercel automatically builds and deploys the latest version. 3. The live version is updated once the deployment is successful.

🔗 Production URL: [https://bus-holding-control-simulator.vercel.app/](https://bus-holding-control-simulator.vercel.app/)

For more details, visit Vercel Documentation.

## 4. Self-Hosting the Project 🏡

If you prefer to run this project on your own infrastructure, we provide a containerized setup using Docker.

### Prerequisites

- Docker installed on your system.

### Running with Docker

1. Build the Docker image

   `docker build -t bus-holding-control-simulator`

2. Run the container

   `docker run -p 3000:3000 bus-holding-control-simulator`

   (Adjust the port if necessary)

3. Access the application

   Open http://localhost:3000 in your browser.

### Object Storage ❗

Since the object storage we used is still on Vercel platform. You need to implement the storage logic and migrate to new one if necessary.
