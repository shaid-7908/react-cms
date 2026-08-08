import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/public/Login";
import DashboardLayouts from "@/pages/dashboard/DashboardLayouts";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import Issue from "@/pages/dashboard/Issue";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    // 🛡️ The Guard: Checks authentication first
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayouts />, // The layout wrapper
        children: [
          {
            index: true, // Matches exactly "/homedashboard"
            element: <DashboardHome />,
          },
          {
            path: "issues", // Matches "/homedashboard/issues"
            element: <Issue />,
          },
          //   {
          //     path: "issues/:issueId", // Dynamic route for a specific issue
          //     element: <IssueDetails />,
          //   },
        ],
      },
    ],
  },

  {
    path: "*", // Catch-all for 404 Not Found
    element: <div>404 - Page Not Found</div>,
  },
]);
