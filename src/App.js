// import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// import "./index.css";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import axios from "axios";
import Tag from "./Pages/Tag";
import Trace from "./Pages/Trace";
import Nav from "./components/Navbar/Navigation";
import TagMethod from "./Pages/Settings/TemplateSettings";
import CategorySettings from "./Pages/Settings/CategorySettings";
import TemplateSettings from "./Pages/Settings/TemplateSettings";
// @mui material components
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import theme from "./assets/theme";
import TagProduct from "./Pages/Tag/TagProduct";
import TagBusinessLocation from "./Pages/Tag/TagBusinessLocation";
import TagAsset from "./Pages/Tag/TagAsset";

// import Settings from "./Pages/Settings";
import SignInComponent from "./components/SignInComp/SignInComponent";

function App() {
  // axios.defaults.baseURL = "http://192.168.1.96:5173";
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://192.168.1.96:4000";

  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <Routes>
      {/* <Route path="/" element={<Signup />} exact /> */}
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />

      <Route exact path="/dashboard" element={<Dashboard />} />

      <Route exact path="/tag" element={<ProtectedRoutes Comp={<Tag />} />} />
      <Route exact path="/tagProduct" element={<TagProduct />} />
      <Route exact path="/tagBusiness" element={<TagBusinessLocation />} />
      <Route exact path="/tagAsset" element={<TagAsset />} />
      <Route exact path="/nav" element={<ProtectedRoutes Comp={<Nav />} />} />
      <Route exact path="/categorySettings" element={<CategorySettings />} />
      {/* <Route exact path="/tagMethod" element={<TagMethod />} /> */}
      <Route exact path="/templateSettings" element={<TemplateSettings />} />

      {/* <Route
        exact
        path="/trace"
        element={<ProtectedRoutes Comp={<Trace />} />}
      /> */}
      <Route exact path="/trace" element={<Trace />} />
      {/* <Route exact path="/settings" element={<Settings />} /> */}

      {/* <Route exact path="/text" element={<Text />} /> */}

      {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
    </Routes>
    // </ThemeProvider>
  );
}

export default App;
