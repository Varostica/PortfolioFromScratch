# Personal Portfolio v2
A modern personal Portfolio built from scratch with **React + TypeScript + Tailwind CSS** and powered by **Strapi** as a headless CMS.  
This project was created as part of a Front-End technical assessment and includes:

- A responsive portfolio UI
- Content managed through Strapi
- External API integration with Fake Store API
- Centralized service layer
- Error handling for API requests
- One unit test
- Documented AI-assisted workflow

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Strapi

### Testing
- Vitest
- React Testing Library

### External API
- Fake Store API

---

## Project Structure

```bash
root/
  frontend/
  backend/
Frontend
```
The frontend contains the React application, reusable components, styling, services, and tests.

## Backend

The backend contains the Strapi project used to manage portfolio content.

## Installation Instructions
### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Python (required by Strapi if using SQLite)

1. **Clone the repository**

git clone [<YOUR_REPOSITORY_URL>](https://github.com/Varostica/PortfolioFromScratch)

cd PortfolioFromScratch

2. **Install and run the backend**

```bash
cd backend/cms
npm install
npm run develop
```

This will start the Strapi admin panel locally.

Default local URL:

http://localhost:1337/admin


3. **Install and run the frontend**

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Default local URL:

http://localhost:5173


4. **Frontend environment variables**

Create a .env file inside the frontend folder with:

```bash
VITE_STRAPI_API_URL=http://localhost:1337/api
VITE_FAKESTORE_API_URL=https://fakestoreapi.com
```


5. **Strapi setup**

Inside Strapi, create and publish the required content entries.

Also make sure public permissions are enabled for the content types used by the frontend:

find
findOne

This is required so the React application can read the content without authentication.


6. **Run tests**

From the frontend folder:

```bash
npm run test
```

## Technical Decisions


1. React + TypeScript

React was chosen to build the SPA required by the assessment, and TypeScript was used to improve maintainability, type safety, and clarity.

2. Tailwind CSS

Tailwind CSS was used to keep styling fast, consistent, and easy to maintain while building a responsive mobile-first interface.

3. Strapi as Headless CMS

Strapi was used to manage portfolio content separately from the frontend. This makes the content easier to update and keeps the UI more flexible and reusable.

4. Centralized Service Layer

API calls were organized into dedicated service files to separate data access from presentation logic. This makes the codebase easier to scale and improves readability.

5. Shared API Client and Error Handling

A shared API client was used to centralize request logic and support clear handling of:

- 4xx errors
- 5xx errors
- network errors

This approach keeps the UI simpler and avoids repeating error-handling logic across components.

6. Reusable UI Patterns

The project reuses common layout and component patterns across sections to keep the interface consistent and reduce duplication.

7. Assessment-Oriented Scope

The implementation was intentionally kept focused and practical. Instead of overbuilding, the goal was to deliver a clean, complete, and well-structured solution aligned with the assessment requirements.

## AI Usage

AI was used as a development assistant during this assessment to support planning, structure, review, and documentation.

It helped with the broader project architecture, including:
- Organizing the project structure and reviewing component logic
- Refining the service layer for Strapi
- Drafting technical explanations and README content
- Supporting test planning and implementation

ChatGPT conversation: https://chatgpt.com/share/69dd4a46-136c-83e9-acf3-ff2def4816ae

### Exercise 2 Validation & Execution
For the Fake Store API and detailed error-handling requirements introduced in Exercise 2, AI was explicitly used to accelerate boilerplate and solidify best practices. Specific support included:
- **Service Design**: Reviewing the integration of the Fake Store API into the existing `apiClient.ts` to ensure the architecture matched the established Strapi patterns.
- **Error-Handling Structure**: Suggesting an extended `ApiError` class approach to cleanly map `4xx`, `5xx`, and network exceptions into distinct, UI-safe strings without polluting components with `switch` statements.
- **Page Scaffolding**: Mirroring the Art Gallery's responsive CSS grid layout to swiftly scaffold the `ProductsPage.tsx` interface. 
- **Implementation Review**: Evaluating final execution choices against the assessment guidelines prior to finalizing.

**Note**: All AI-generated scaffolding and suggestions were strictly reviewed, adapted, and validated before inclusion. Final implementation choices, UI styling, and error string decisions were deliberately controlled and adjusted manually to meet expectations cleanly.

## Features Implemented
Responsive portfolio built with React
Strapi-managed content
Reusable sections and components
Fake Store API integration
Detailed error handling
Simple products section inside the portfolio
One unit test
README documentation with technical decisions and AI usage
Future Improvements
Add more unit and integration tests
Improve accessibility coverage
Add animations and richer transitions
Expand CMS flexibility with more reusable content blocks
Add deployment configuration
Author

**Valentina Aróstica**

GitHub: https://github.com/Varostica
LinkedIn: https://www.linkedin.com/in/valentina-arostica/
