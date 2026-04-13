#Exercise 4: Refactoring

Here is a structured breakdown of the refactoring process, starting from a basic modern version, improving it to a robust production standard, and finally simplifying it into a clean, interview-ready solution.

1. Initial Modern Refactoring
First, let's address the most basic issues: converting to TypeScript, replacing .then() chains with async/await, and returning the data instead of logging it.

```typescript
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
async function getUser(userId: number | string): Promise<User> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const user = await response.json();
  return user;
}
```

2. Further Improvement (Robust Production Level)
While the above is modern, it fails silently or unpredictably on bad input, network failure, or API changes. Here is how we can bulletproof it by handling 4xx/5xx errors, network failures, input validation, and bad payloads.

```typescript
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
async function getUser(userId: number | string): Promise<User> {
  // Input validation
  if (userId === undefined || userId === null || userId === '') {
    throw new Error('Invalid user ID provided');
  }
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${encodeURIComponent(userId)}`);
    // Handle 4xx and 5xx HTTP errors (fetch doesn't throw on these by default)
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        throw new ApiError(response.status, `Client Error: User not found or invalid request (${response.status})`);
      }
      if (response.status >= 500) {
        throw new ApiError(response.status, `Server Error: Unable to process request (${response.status})`);
      }
      throw new ApiError(response.status, `Unexpected HTTP Error: (${response.status})`);
    }
    const data = await response.json();
    // Prevent unexpected API payloads from crashing the app down the line
    if (!data || typeof data !== 'object' || !('id' in data)) {
      throw new Error('API Contract Violation: missing expected user structure');
    }
    return data as User;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; 
    }
    // Catch-all for network offline scenarios or JSON parsing errors
    throw new Error(`Network or parsing failure: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
```

3. Review & Simplify (Interview-Ready Version)
The highly robust version above is great for critical production systems, but in a front-end technical assessment, custom Error classes and deep HTTP status granularities can sometimes look slightly "overengineered" or distracting.

Here is the ideal balance. It is clean, easy to read, shows a deep understanding of standard JavaScript pitfalls, and hits every requirement without unnecessary boilerplate.

```typescript
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
/**
 * Fetches a user by ID from the placeholder API.
 */
async function getUser(userId: number | string): Promise<User> {
  // 1. Input Validation
  if (!userId) {
    throw new Error('A valid user ID is required.');
  }
  try {
    // 2. Safely encode parameters for the network query
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${encodeURIComponent(userId)}`);
    // 3. HTTP Error Handling (e.g., 404, 500)
    if (!response.ok) {
      throw new Error(`Failed to fetch user. Status: ${response.status} ${response.statusText}`);
    }
    const data: unknown = await response.json();
    // 4. Payload Validation (Lightweight API contract check)
    if (!data || typeof data !== 'object' || !('id' in data)) {
      throw new Error('Invalid response structure received from API.');
    }
    // 5. Data Return
    return data as User;
  } catch (error) {
    // 6. Network/Parsing Error Handling
    if (error instanceof Error) {
      throw new Error(`getUser failed: ${error.message}`);
    }
    throw new Error('getUser failed with an unknown error.');
  }
}
```

Explanation of Main Improvements (To discuss in an assessment):
Modern Syntax (async/await): Switched away from .then() chains to provide a linear, easier-to-read top-down flow.
Type Safety (interface, Promise<User>): Replaced implicit any with strict typing. Casting unknown to User at the end ensures we trust the data only after we've validated its shape.
Input Validation: Added an early throw to prevent making bad network requests entirely if the userId is empty.
Security (encodeURIComponent): Guarded against malformed URLs by encoding the dynamic userId before inserting it into the fetch URL.
Handling the Fetch Trap (response.ok): fetch() only throws an error on network failure (like losing internet connection). It does not throw an error on 404 or 500 HTTP statuses. We manually check response.ok to catch architectural errors gracefully.
API Payload Validation: Validated the id property on the response object. If the endpoint breaks or changes its contract, our app catches the anomaly immediately instead of passing bad data down into React/UI components and causing cryptic "Cannot read properties of undefined" errors later.
Single Responsibility: Removed the hardcoded console.log() side-effect so the function is now a pure-ish data deliverer that can be reused anywhere in the app.


## Prompt used:
Refactor this function into modern, production-ready TypeScript. Use async/await, clear error handling, input validation, and clean readable structure. Avoid console.log as the final behavior and make the function return the user data instead.

function getUser(d){ return
fetch("https://jsonplaceholder.typicode.com/users/"+d).then(x=>x.json()).then(j=>console.log(j)) }

Improve the refactored function further for production quality. Handle invalid input, 4xx errors, 5xx errors, network failures, and unexpected API payloads. Keep the implementation clean and easy to explain in a technical assessment.

Review the final refactored version and simplify it so it still looks production-ready but not overengineered. Keep it suitable for a front-end technical assessment and explain the main improvements compared to the original code.