# Mini-Radar Ukraine

Welcome to **Mini-Radar Ukraine**, a dynamic and interactive web application designed to visualize and manage targets on a map of Ukraine. This project provides a simple yet powerful interface for real-time tracking, making it an excellent tool for monitoring and analysis.

## ✨ Features

- **Interactive Map**: A responsive map centered on Ukraine, providing a clear and intuitive user experience.
- **Target Visualization**: Display targets with custom markers, showing their location and details at a glance.
- **Add New Targets**: Easily add new targets by clicking on the map and filling out a simple form with details like name, direction, and quantity.
- **Real-Time Updates**: The application fetches and displays the latest target data, ensuring you always have the most current information.
- **Clear All Targets**: A convenient one-click option to clear all targets from the map, allowing for a fresh start.
- **Containerized Deployment**: The entire application is containerized with Docker, ensuring a consistent and hassle-free setup across different environments.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running on your machine.

### Prerequisites

Make sure you have the following software installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Running

1.  **Clone the repository to your local machine:**

    ```sh
    git clone https://github.com/your-username/miniradarUA.git
    cd miniradarUA
    ```

2.  **Launch the application using Docker Compose:**

    ```sh
    docker-compose up --build -d
    ```

    This command will build the Docker images for the frontend and backend services and start them in detached mode.

3.  **Access the application in your browser:**

    -   **Frontend**: Navigate to `http://localhost:8080`
    -   **Backend API**: The backend server is accessible at `http://localhost:3000`

## 🧪 Running Tests

This project comes with a comprehensive test suite to ensure the reliability and correctness of the application.

### Backend API Tests

To run the backend tests using **Jest** and **Supertest**, execute the following command:

```sh
docker-compose exec backend npm test
```

This will run the tests within the `backend` service container and display the results in your terminal.

### End-to-End (E2E) Tests

To run the end-to-end tests using **Playwright**, use the following command:

```sh
docker-compose run --rm e2e
```

This command will start a dedicated `e2e` service, run the Playwright tests in a headless browser, and generate a detailed report in the `playwright-report` directory.

## 🛠️ Built With

This project is built with a modern and robust technology stack:

-   **Frontend**:
    -   [Vue.js](https://vuejs.org/)
    -   [Vite](https://vitejs.dev/)
    -   [Axios](https://axios-http.com/)
-   **Backend**:
    -   [Node.js](https://nodejs.org/)
    -   [Express.js](https://expressjs.com/)
-   **Testing**:
    -   [Playwright](https://playwright.dev/)
    -   [Jest](https://jestjs.io/)
    -   [Supertest](https://github.com/visionmedia/supertest)
-   **Containerization**:
    -   [Docker](https://www.docker.com/)
    -   [Docker Compose](https://docs.docker.com/compose/)

[Українська версія нижче / Ukrainian version below]

## 🌟 About

Mini Radar is a web-based application designed for tracking and displaying potential targets on an interactive map of Ukraine. The application provides a user-friendly interface for adding, managing, and visualizing targets with their respective directions and quantities.

## 🚀 Features

- Interactive dark-themed map of Ukraine
- Add targets by specifying location, direction, and quantity
- Visual representation of targets with direction indicators
- Quantity badges for multiple targets at the same location
- Screenshot functionality for saving the current map view
- Responsive design that works on various devices

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 📸 Screenshot

To take a screenshot of the current map view, click the "Зберегти скріншот" (Save Screenshot) button. The image will be automatically downloaded to your device.

## 🔒 Security Note

This application is for authorized use only. Unauthorized access, distribution, or modification is strictly prohibited.

---

# Міні Радар України

## 🌟 Про проєкт

Міні Радар - це веб-додаток, призначений для відстеження та відображення цілей на інтерактивній карті України. Додаток надає зручний інтерфейс для додавання, керування та візуалізації цілей з відповідними напрямками та кількістю.

## 🚀 Можливості

- Інтерактивна темна карта України
- Додавання цілей з вказівкою місця, напрямку та кількості
- Візуальне відображення цілей з індикацією напрямку
- Відображення кількості цілей у вигляді бейджів
- Можливість збереження знімку поточного вигляду карти
- Адаптивний дизайн для різних пристроїв

## 🛠️ Встановлення

### Необхідні компоненти
- Node.js (версія 14 або вище)
- npm (входить до складу Node.js)

### Налаштування бекенду
1. Перейдіть до директорії бекенду:
   ```bash
   cd backend
   ```
2. Встановіть залежності:
   ```bash
   npm install
   ```
3. Запустіть сервер бекенду:
   ```bash
   npm start
   ```
   Бекенд буде доступний за адресою `http://localhost:3000`

### Налаштування фронтенду
1. Перейдіть до директорії фронтенду:
   ```bash
   cd frontend
   ```
2. Встановіть залежності:
   ```bash
   npm install
   ```
3. Запустіть сервер розробки:
   ```bash
   npm run dev
   ```
   Фронтенд буде доступний за адресою `http://localhost:5173`

## 📸 Знімок екрану

Щоб зробити знімок поточного вигляду карти, натисніть кнопку "Зберегти скріншот". Зображення буде автоматично завантажене на ваш пристрій.

## 🔒 Примітка щодо безпеки

Цей додаток призначений виключно для авторизованого використання. Несанкціонований доступ, поширення або модифікація суворо заборонені.