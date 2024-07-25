import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import TopicQuestionsList from './Components/TopicQuestionsList';
import { Provider } from 'react-redux';
import { Store } from './Store/Store';
import Editor from './Components/Editor';
import HeaderShimmer from './Shimmer/HeaderShimmer';
import AppShimmer from './Shimmer/AppShimmer';
import AppLayoutShimmer from './Shimmer/AppLayoutShimmer';
import QuestionsListShimmer from './Shimmer/QuestionsListShimmer';
import EditerShimmer from './Shimmer/EditerShimmer';
const App = lazy(() => import("./App"))
const Header = lazy(() => import("./Components/Header"))

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppLayout = () => {
  return (
    <div>
      <Suspense fallback={<HeaderShimmer />}>
        <Header />
      </Suspense>
      <Outlet />
    </div>
  )
}

const Approuter = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<AppLayoutShimmer />}>
      <AppLayout />
    </Suspense>,
    children: [
      {
        path: "/",
        element:
          <Suspense fallback={<AppShimmer />}>
            <App />
          </Suspense>
      },
      {
        path: "/topic",
        element:
          <Suspense fallback={<QuestionsListShimmer />}>
            <TopicQuestionsList />
          </Suspense>
      },
      {
        path: "/editor",
        element:
          <Suspense fallback={<EditerShimmer />}>
            <Editor />
          </Suspense>
      },
    ]
  }
])

root.render(
  <Provider store={Store}>
    <RouterProvider router={Approuter} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
