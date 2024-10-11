import React from "react";
import AppRoutes from "./routes/index";
import { NotificationProvider } from "./utils/Notifications";

function App() {
  return (
    <NotificationProvider>
      <AppRoutes />
    </NotificationProvider>
  );
}

export default App;
