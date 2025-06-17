---

# SnapNews 📰

SnapNews is a modern and dynamic news aggregator application built with React and Vite. It provides users with a seamless experience to browse the latest news headlines from various categories, bookmark articles for later reading, and get AI-powered summaries for a "Quick Read". The application features a clean, responsive interface with a toggleable light/dark theme.

### Live Demo (Placeholder)
[https://snap-news-demo.netlify.app/](https://snap-news-demo.netlify.app/)

## Key Features

*   **Categorized News:** Browse top headlines from categories like Business, Technology, Sports, and more.
*   **AI-Powered Summaries:** Utilizes the Google Gemini API to provide concise summaries of articles with a single click.
*   **Bookmarking:** Save your favorite articles to read later. Bookmarks are persisted in the bookmarks page.
- **Persistent State:** Bookmarks and user theme preferences are saved in `localStorage` for a consistent experience across sessions.
- **Theme Switching:** Instantly toggle between a light and dark mode.
- **Responsive Design:** A clean and usable interface on both desktop and mobile devices.
- **Modern Frontend Stack:** Built with Vite for a fast and efficient development experience.

## Tech Stack & APIs
- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router DOM v7
- **Styling:** Plain CSS with a variable-based theme system
- **API Clients:** `fetch` API
- **APIs:**
    - [NewsAPI](https://newsapi.org/) for fetching news articles.
    - [Google Gemini API](https://ai.google.dev/) for article summarization.

## Technologies Used

*   **Frontend:** React.js, Vite
*   **Routing:** React Router DOM
*   **API Calls:** Fetch API (Browser native)
*   **Styling:** CSS with Variables for Theming
*   **Linting:** ESLint
*   **APIs:**
    *   [NewsAPI](https://newsapi.org/) for fetching news articles.
    *   [Google Gemini API](https://ai.google.dev/) for article summarization.

## In-Depth Code Analysis

### Project Structure

The project follows a standard and organized React application structure, separating concerns into dedicated directories.

```
└── SnapNews/
    ├── public/             # Static assets
    ├── src/
    │   ├── assets/         # Images, icons, etc.
    │   ├── components/     # Reusable React components (Navbar, NewsCard)
    │   ├── contexts/       # React Context for global state (BookmarkContext)
    │   ├── pages/          # Page-level components (HomePage, BookmarksPage)
    │   ├── routes/         # Application routing configuration
    │   ├── styles/         # CSS files for global styles and theming
    │   └── utils/          # Utility functions, like API calls
    ├── .eslintrc.js        # ESLint configuration
    ├── package.json        # Project dependencies and scripts
    └── vite.config.js      # Vite configuration
```

### Core Components & Logic

*   **`components/Navbar.jsx`**: This component serves two main purposes: navigation and theme switching.
    *   **Navigation**: Uses `react-router-dom`'s `<Link>` component for client-side routing to the Home and Bookmarks pages.
    *   **Theme Switching**: Manages the theme state (`light`/`dark`). It uses a `useEffect` hook to update a `data-theme` attribute on the `<html>` element and persists the user's choice in `localStorage`, ensuring the theme is remembered across sessions.

*   **`contexts/BookmarkContext.jsx`**: A prime example of using is in use).

## Project Structure
The project follows a standard React application structure, organizing files by feature and type.
```
SnapNews/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable React components (Navbar, NewsCard)
│   ├── contexts/         # React Context for global state (BookmarkContext)
│   ├── pages/            # Page-level components (HomePage, BookmarksPage)
│   ├── routes/           # Routing configuration (AppRoutes)
│   ├── styles/           # Global and theme-specific CSS
│   ├── utils/            # Utility functions, including API calls (api.jsx)
│   ├── App.jsx           # Root application component
│   └── main.jsx          # Entry point of the application
├── .eslintrc.config.js   # ESLint configuration
├── package.json          # Project dependencies and scripts
└── vite.config.js        # Vite configuration
```

---

## In-Depth Code Analysis

This section provides a deeper look into the key components and logic of the SnapNews application.

### Component Breakdown

- **`Navbar.jsx`**: This component serves two purposes: navigation and theme switching. It uses `react-router-dom`'s `<Link>` component for routing. The theme-switching logic is handled by `useState` and `useEffect` hooks. The selected theme is stored in `localStorage` to ensure persistence between visits.

- **`CategoryBar.jsx`**: A simple but effective component that renders a list of categories as buttons. Clicking a button invokes the `setCategory` function passed down from `HomePage`, triggering a re-fetch of news for the selected category.

- **`NewsCard.jsx`**: This is the primary UI element for displaying a single news article summary on the home page.

  - It receives an `article` object as a prop.
  - It uses the custom `useBookmarks` hook to check if the article is already bookmarked (`isBookmarked`).
  - The UI dynamically changes the bookmark button's text and style based on the `isBookmarked` status.
  - It links to the `NewsDetailPage` using the article's index as a URL parameter.

- **`HomePage.jsx`**: The main landing page. It manages the state for the current news list (`news`) and the selected `category`. The `useEffect` hook is used to call `fetchNews` from the API utility whenever the `category` state changes, ensuring the displayed news is always up-to-date.

- **`NewsDetailPage.jsx`**: This page displays the full content of a selected article.
  - It uses the `useParams` hook from React Router to get the article's index from the URL (`/news/:id`).
  - **Note on Data Fetching:** It currently re-fetches the entire 'general' news list and then selects the article by index. This is inefficient and could be improved (see Interview Q&A).
    React's Context API for global state management.
  * **State Management**: It holds the `bookmarks` array. Instead of passing this state down through multiple levels of props (prop drilling), it provides the state and manipulator functions (`addBookmark`, `removeBookmark`) to any component that needs them.
  * **Persistence**: It cleverly uses two `useEffect` hooks. The first runs on initial mount to load saved bookmarks from `localStorage`. The second runs whenever the `bookmarks` state changes, saving the updated array back to `localStorage`.
  * **`useBookmarks` Hook**: This custom hook simplifies the process of consuming the context, providing a clean one-liner for components to access bookmark data.

* **`pages/HomePage.jsx`**: The main entry point for users.

  - It fetches and displays a list of news articles using the `fetchNews` utility.
  - It manages the `category` state, which is updated by the `CategoryBar` component. A `useEffect` hook re-fetches the news whenever the category changes.

* **`pages/NewsDetailPage.jsx`**: Displays a single, detailed article.

  - **Dynamic Routing**: It uses the `useParams` hook from React Router to get the article's index (`id`) from the URL.
  - **Data Fetching**: It fetches the list of "general" news and selects the article based on the `id`. _(Note: This is an area for potential refactoring to improve efficiency)._
  - **AI Summarization**: The "Quick Read" button triggers an async function that calls the `fetchSummary` utility, sending the article content to the Gemini API and displaying the returned summary. It also manages a `loading` state to provide feedback to the user.

* **`utils/api.jsx`**: This file abstracts all external API interactions.
  - `fetchNews`: A function that constructs the URL for the NewsAPI, makes the request, and returns the list of articles.
  - `fetchSummary`: A function that makes a `POST` request to the Google Gemini API with the article content and specific generation configurations.
  - **Security Concern**: API keys are hardcoded. This is a significant security risk as they are exposed in the client-side bundle. The standard practice is to use environment variables (`.env` file) - The "Quick Read" button triggers an async function `handleQuickRead` which calls the `fetchSummary` API, displaying a loading state while waiting for the response.

- **`BookmarksPage.jsx`**: This page displays all articles that the user has bookmarked. It retrieves the list of bookmarks from `BookmarkContext` and provides a "Remove" button for each, allowing users to manage their saved articles.

### Core Concepts

- **Routing (`routes/routes.jsx`)**: The application uses `react-router-dom` to handle client-side routing. A central `AppRoutes` component defines the paths for `HomePage`, `NewsDetailPage`, and `BookmarksPage`, all nested within a `Router` and displayed alongside a persistent `Navbar`.

- **State Management (Context API - `contexts/BookmarkContext.jsx`)**: The Context API is used for managing the global state of bookmarks.

  - **`BookmarkProvider`**: This component wraps the application and holds the `bookmarks` state.
  - **`useEffect` Hooks**: Two `useEffect` hooks are used: one to initialize the state from `localStorage` on component mount, and another to update `localStorage` whenever the `bookmarks` state changes. This ensures data persistence.
  - **`useBookmarks` Hook**: A custom hook that simplifies access to the context's value (`bookmarks`, `addBookmark`, `removeBookmark`) in any component that needs it, promoting clean and reusable code.

- **API Interaction (`utils/api.jsx`)**: All external API calls are centralized as described in the "Getting Started" section.

---

## Project Summary for an Interviewer

SnapNews is a dynamic news aggregator I built using React. It demonstrates my ability to create a feature-rich, single-page application with a modern frontend stack.

The core of the application is built around **React**, with **React Router** handling client-side navigation between the main news feed, a detailed article view, and a user's bookmarked articles page.

For state management, I utilized a combination of local component state with `useState` for things like the selected news category, and React's **Context API** for global state. The `BookmarkContext` is a key part of this, providing a clean and efficient way to manage and persist user bookmarks across the entire application using **localStorage** without prop drilling.

A standout feature is the **AI-powered " here. - **`fetchNews`**: An async function that constructs the URL for the NewsAPI, makes the request, and returns the array of articles. It includes basic error handling. - **`fetchSummary`**: An async function that sends a POST request to the Google Gemini API. It takes the article content as input and sends it in the request body, along with configuration parameters. - **Security Flaw\*\*: The API keys are hardcoded. In a production app, these must be replaced with environment variables (`import.meta.env.VITE_...`) to avoid exposing them in the client-side bundle.

- **Styling (`styles/`)**: The project uses plain CSS. `global.css` contains styles for components like `Navbar` and `NewsCard`. `themes.css` defines CSS variables for light and dark themes. The theme is applied by setting a `data-theme="dark"` attribute on the `<html>` element, which allows the CSS variables in `themes.css` to override the defaults.

---

## How to ExplainQuick Read"**, which integrates with the **Google Gemini API\*\*. When a user requests a summary, the application sends the article content to the API and displays the concise summary, showcasing my ability to work with and integrate third-party REST APIs.

The application's architecture is organized and scalable, with a clear separation of concerns into distinct directories for \*\*re This Project in an Interview
"SnapNews is a dynamic news aggregator I built using React. The goal was to create a clean, user-centric platform for browsing news with a modern technology stack.

Key features include fetching and displaying news articles fromusable components, pages, context, routing, and API utilities\*\*, which makes the codebase easy to maintain and extend.

the NewsAPI, categorized browsing, and a persistent bookmarking system that saves user selections to `localStorage`. For state management, I---

## Probable Interview Questions & Answers

Here are 10 potential questions an interviewer might ask about this project, along chose React's Context API to handle the bookmarks globally, which provided a lightweight solution without needing a larger library like Redux with well-structured answers.

**1. Can you walk me through the project's architecture?**

> .

One of the more complex features I implemented is the 'Quick Read' functionality. This integrates with the Google Gemini API to provide **Answer:** "Certainly. The project is structured with a clear separation of concerns. The `src` directory is the main hub, containing subdirectories for `components` (small, reusable UI pieces like the Navbar and NewsCard), `pages` (larger on-demand, AI-generated summaries of articles, demonstrating my ability to work with asynchronous operations and third-party services components that correspond to application routes like HomePage), `contexts` for global state management like bookmarks, `routes` to define the URL.

The application is built with Vite for a fast development workflow and uses React Router for client-side navigation. I also implemented a paths, `styles` for our CSS, and `utils` for abstracting logic like API calls. This component-based architecture makes light/dark theme switcher to practice manipulating the DOM and managing user preferences. This project showcases my skills in component-based architecture the application modular, scalable, and easy to maintain."

\*\*2. How did you manage state in this application? Why did you, state management, API integration, and creating a responsive user interface."

---

## Potential Interview Questions & Answers

choose that approach?\*\*

> **Answer:** "I used a two-tiered approach. For state that was local to a singleHere are 10 potential questions an interviewer might ask about this project, along with well-structured answers.

#### component, like the selected category on the `HomePage`, I used the `useState` hook. For global state that needed to be shared 1. Why did you choose the Context API for state management over a library like Redux?

**Answer:** " across multiple, non-related components, like the user's bookmarks, I used React's Context API. IFor this project, the primary piece of global state was the list of bookmarked articles. The Context API was the ideal chose Context because it's built into React and is perfect for managing low-frequency updates on a small-to-medium scale choice because it's built into React and provides a clean, straightforward way to share state and functionality without adding external dependencies application like this. It avoids the complexity and boilerplate of a larger library like Redux while effectively solving the problem of prop drilling.". The data flow was simple: multiple components needed to read the bookmarks list, and a few needed to update it. Redux

**3. I see API keys hardcoded in `src/utils/api.jsx`. What are the security implications, and how would you fix this?**

> **Answer:** "That's an excellent point, and it would have been overkill, introducing boilerplate like actions, reducers, and store configuration that wasn't necessary for the scale's something I would absolutely change for a production environment. Hardcoding API keys is a major security risk because they are exposed in of this application. I chose the most appropriate tool for the job, keeping the application lightweight and maintainable."

#### the client-side JavaScript bundle, allowing anyone to steal and misuse them, potentially incurring costs or hitting rate limits. The 2. Your API keys are visible in the `api.jsx` file. What are the security risks and how would you fix this?

**Answer:** "Exposing API keys on the client-side is a major security risk. It allows anyone correct solution is to use environment variables. In a Vite project, I would create a `.env` file, add the keys prefixed with `VITE_` (e.g., `VITE_NEWS_API_KEY=...`), add to copy my keys and use them, potentially exhausting my API quotas or incurring costs. In a production environment, I would the `.env` file to `.gitignore`, and then access them securely in the code via `import.meta.env.VITE_NEWS_API_KEY`. This ensures the keys are never committed to version control."

**4. Explain use environment variables. With Vite, I'd create a `.env` file at the project root, store my keys there (e.g., `VITE_NEWS_API_KEY=...`), and access them in my code via the bookmarking feature. How is the state shared and persisted?**

> **Answer:** "The bookmarking feature is `import.meta.env.VITE_NEWS_API_KEY`. The `VITE_` prefix tells managed by the `BookmarkContext`. This context provider wraps the entire application and holds the array of bookmarked articles in its Vite to expose these variables to the client-side code, and the `.env` file would be included in `.gitignore` to prevent state. It exposes `addBookmark` and `removeBookmark` functions. Components like `NewsCard` consume this context using the ` it from being committed to version control."

#### 3. In `NewsDetailPage.jsx`, you re-fetch the 'general' news list and select an article by its array index. What are the problems with this approach and how would you improveuseBookmarks`custom hook to check if an article is bookmarked and to trigger these functions. Persistence is achieved with two`useEffect`hooks inside the provider: one loads the bookmarks from`localStorage` on initial app load, and the other saves it?

**Answer:** "This approach has two main problems: it's inefficient and brittle. It's inefficient because it re-fetches up to 20 articles when I only need one. It's brittle because the article' the entire bookmarks array back to `localStorage` any time it's modified. This ensures the user's bookmarks are saved between sessions."

**5. In `NewsDetailPage.jsx`, you're fetching the entire list of news articles again just to display one. Is this efficient? How would you improve it?**

> **Answer:** "You're rights index can change if the API returns a different list of top headlines, meaning a user's bookmarked link could point to the wrong article later.

A better solution would be to pass the article object directly from the `HomePage` to the, that is not an efficient approach. It's brittle because the article list could change between page loads, and it's wasteful as it fetches unnecessary data. I would improve this in one of two ways. My preferred method would be to pass `NewsDetailPage` using React Router's `location.state`. On the `NewsCard`, the `<Link>` would look like this: `<Link to={`/news/${index}`} state={{ article: article }}>`. Then, in `NewsDetailPage`, the entire article object from the `HomePage` to the `NewsDetailPage` using React Router's `state` prop, like `<Link to={...} state={{ article: articleObject }}>`. This requires no extra API calls. If the API supported I could access it with the `useLocation` hook. This eliminates the unnecessary API call and ensures the correct article data is always fetching a single article by a unique ID, an even better, more decoupled solution would be to pass only that ID in the URL and displayed."

#### 4. Can you walk me through the data flow when a user bookmarks an article on the `HomePage`?

**Answer:** "Certainly.

1.  The user clicks the 'Bookmark' button on a `NewsCard` have the `NewsDetailPage` make a dedicated API call for just that single article."

**6. How does the theme switching work?**

> **Answer:** "The theme is managed by a state variable in the `Navbar` component component. 2. This button's `onClick` handler calls the `addBookmark` function, which it gets from the `useBookmarks` custom hook. 3. The `addBookmark` function, defined in `. When the user clicks the toggle button, the state changes from 'light' to 'dark' or vice-versa. ABookmarkContext.jsx`, updates the `bookmarks` state array by adding the new article. 4. Because the `bookmarks` state has changed, the `useEffect` hook in `BookmarkContext` that watches this state is triggered. This hook serial `useEffect` hook is listening to this state change. When it fires, it does two things: first, it updates the `data-theme` attribute on the root `<html>` element. Second, it saves the new theme choice to `localStorage`. Theizes the updated `bookmarks` array and saves it to `localStorage`. 5. Simultaneously, any component subscribed styling is handled in CSS, where I've defined CSS variables for colors in `:root` and then overridden those variables within a `[data-theme='dark']` selector."

**7. How is routing handled in this project?**

> to this context, like the `NewsCard` itself, re-renders. The `NewsCard` now sees that the article is included in the `bookmarks` array, and its UI updates to show a 'Remove' button instead of a 'Bookmark' button **Answer:** "Routing is handled by the `react-router-dom` library. In `src/routes/routes.jsx`, I've set up a `BrowserRouter` to enable client-side routing. Inside it, a `Routes` component."

#### 5. Explain your use of the `useEffect` hook in `BookmarkContext.jsx`.

**Answer:** "In `BookmarkContext.jsx`, I use two `useEffect` hooks to manage the persistence of bookmarks.

- The first `useEffect` runs only once when the `BookmarkProvider` mounts, signified by its empty dependency array `acts as a switch, rendering the first`Route`that matches the current URL. I've defined three routes:`/`for the`HomePage`, `/bookmarks`for the`BookmarksPage`, and a dynamic route, `/news/:id`, for the `NewsDetailPage`. This dynamic route uses the `useParams` hook in the detail page to extract the[]`. Its job is to read the 'bookmarks' item from `localStorage`, parse it, and initialize the `bookmarks` state with this saved data. This ensures that a user's bookmarks are loaded when they open the app.
- The second `useEffect `id` from the URL, allowing it to display the correct article."

**8. Tell me about the "Quick Read" feature. How does it work on a technical level?**

> **Answer:** "The 'Quick Read' feature`has`[bookmarks]`as its dependency array. It runs every time the`bookmarks`state changes. Its purpose is to save the current state of the`bookmarks`array back into`localStorage`, ensuring that any new or removed bookmark is immediately persisted integrates with the Google Gemini API to summarize articles. When a user clicks the button, the `handleQuickRead`async function in`NewsDetailPage` is called. This function takes the full content of the current article and passes it to my."

#### 6. How do you handle the UI loading state for the "Quick Read" feature?

**Answer:** " `fetchSummary` utility function. This utility then constructs and sends a `POST` request to the Gemini API endpoint,In `NewsDetailPage.jsx`, I manage the loading state with a simple boolean state variable: `const [loading, setLoading] = useState(false)`.

- When the user clicks the 'Quick Read' button, the `handleQuickRead` function is with the article content embedded in the JSON payload. Once the API returns a successful response containing the summary, the component updates its called, and the very first thing it does is `setLoading(true)`.
- This state change causes state with the new summarized text, which then replaces the original content on the screen. I also set a `loading` state during the API call to provide user feedback."

\*\*9. Why did you choose to use React Context over a library the component to re-render, and I use a ternary operator on the button's text: `{loading ? "Summarizing..." : "Quick Read"}`. This provides immediate visual feedback to the user.

- Once the asynchronous like Redux for state management?\*\*
  > **Answer:** "I chose React Context because it was the right tool for the job API call to `fetchSummary` completes (either successfully or with an error), I call `setLoading(false)` inside a `finally` block or at the end of the function to return the button to its original state."

#### 7.'s scale and complexity. The primary global state in this app is the list of bookmarks, which is updated infrequently. Context is How does your light/dark theme system work?

**Answer:** "The theme system is based on CSS custom properties built into React, requires no extra dependencies, and has a much simpler API than Redux. It provided a perfect solution for avoiding (variables) and a `data-theme` attribute on the `<html>` element.

1.  In `src/styles/themes.css`, I define two sets of CSS variables. The default set is inside the `:root` prop drilling without introducing the overhead of actions, reducers, and middleware that comes with Redux. If the application were to grow significantly with more complex, interconnected, and frequently updated state, then migrating to Redux or a similar library would selector for the light theme. The dark theme variables are defined within a `[data-theme="dark"]` attribute be a valid consideration."

**10. If you had another week to work on this project, what would you add selector. 2. In the `Navbar` component, a `theme` state variable holds either 'light' or 'dark'. A `useEffect` hook watches this state. 3. Whenever the `theme` state changes, or improve?**

> **Answer:** "With more time, I would focus on three key areas:
>
> 1.  **Refactoring:** First, I'd refactor the data fetching on the `NewsDetailPage` to the `useEffect` hook runs and executes `document.documentElement.setAttribute('data-theme', theme)`. This adds or changes the `data-theme` attribute on the `<html>` tag.
> 2.  The browser's CSS engine be more efficient, as we discussed earlier.
> 3.  **New Features:** I'd add a search functionality to allow users to find articles by keywords. I would also implement pagination or infinite scrolling on the home page to provide a then automatically applies the new set of variable values, and any component styled with these variables (e.g., `background-color: var(--background-color)`) instantly updates its appearance."

#### 8. If you had another week to work better user experience when dealing with a large number of articles.

> 3.  **Production Readiness:** I would significantly improve the error handling by adding user-facing feedback, like toast notifications, when an API call fails. Finally, I would write on this project, what would you add or refactor?
>     **Answer:** "I would focus on three areas. First, I'd implement the `location.state` fix for the `NewsDetailPage` to make data fetching more efficient. Second, I unit and integration tests using Jest and React Testing Library to ensure the application's components and logic are robust and reliable." would add more robust error handling and UI feedback, such as displaying a toast notification if an API call fails or if a bookmarked article is no longer available. Finally, I'd add a search functionality to allow users to search for articles by keywords, which would involve creating a new API utility function and managing search input state."

#### 9. What is the purpose of the `useParams` hook?

**Answer:** "The `useParams` hook from React Router is used to access dynamic parameters from the URL. In this project, the route to the detail page is defined as `/news/:id`. The `:id` portion is a dynamic segment. In the `NewsDetailPage` component, calling `const { id } = useParams()` extracts the value from that segment of the URL, allowing the component to know which specific article it needs to display."

#### 10. What are the roles of `main.jsx` and `App.jsx` in this application?

**Answer:** "`main.jsx` is the absolute entry point of the React application. Its primary job is to import the main `App` component, find the root DOM element (the `div` with `id="root"` in `index.html`), and use React DOM's `createRoot().render()` method to mount the entire application into the DOM.

`App.jsx` acts as the root component of the application's component tree. In this project, its
