import RequireAuth from "@/components/RequireAuth";
import RequireAdmin from "@/components/RequireAdmin";
import Billing from "@/pages/billing";
import BillingSuccess from "@/pages/billing-success";
import Chat from "@/pages/chat";
import Dashboard from "@/pages/dashboard";
import Home from "@/pages/home";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import PolicyDetail from "@/pages/PolicyDetail";
import ProgramDetail from "@/pages/ProgramDetail";
import PoliciesOverview from "@/pages/PoliciesOverview";
import ProgramsOverview from "@/pages/ProgramsOverview";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Authentication routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Policy routes */}
        <Route path="/policies" element={<PoliciesOverview />} />
        <Route path="/policies/economic-freedom" element={<PolicyDetail />} />
        <Route path="/policies/food-health-sovereignty" element={<PolicyDetail />} />
        <Route path="/policies/property-rights" element={<PolicyDetail />} />
        <Route path="/policies/government-accountability" element={<PolicyDetail />} />
        <Route path="/policies/election-integrity" element={<PolicyDetail />} />
        <Route path="/policies/constitutional-rights" element={<PolicyDetail />} />
        <Route path="/policies/technology-communications" element={<PolicyDetail />} />
        <Route path="/policies/monetary-reform" element={<PolicyDetail />} />
        <Route path="/policies/political-reform" element={<PolicyDetail />} />
        <Route path="/policies/foreign-policy" element={<PolicyDetail />} />
        <Route path="/policies/healthcare-reform" element={<PolicyDetail />} />
        <Route path="/policies/education-reform" element={<PolicyDetail />} />
        <Route path="/policies/social-security" element={<PolicyDetail />} />

        {/* Program routes */}
        <Route path="/programs" element={<ProgramsOverview />} />
        <Route path="/programs/member-support" element={<ProgramDetail />} />
        <Route path="/programs/community-service" element={<ProgramDetail />} />
        <Route path="/programs/youth-programs" element={<ProgramDetail />} />
        <Route path="/programs/media-influence" element={<ProgramDetail />} />

        {/* Billing routes */}
        <Route
          path="/billing"
          element={
            <RequireAuth>
              <Billing />
            </RequireAuth>
          }
        />
        <Route
          path="/billing/success"
          element={
            <RequireAuth>
              <BillingSuccess />
            </RequireAuth>
          }
        />

        {/* Chat routes */}
        <Route
          path="/chat"
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Dashboard />
            </RequireAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
