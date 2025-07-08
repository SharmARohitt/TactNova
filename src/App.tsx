import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import TechSolutionsPage from './pages/TechSolutionsPage';
import NonTechSolutionsPage from './pages/NonTechSolutionsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { TeamPage } from './pages/TeamPage';
import { CareersPage } from './pages/CareersPage';
import { PressPage } from './pages/PressPage';
import { SecurityPage } from './pages/SecurityPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { CommunityPage } from './pages/CommunityPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { StatusPage } from './pages/StatusPage';
import { WhitepapersPage } from './pages/WhitepapersPage';
import { ApiReferencePage } from './pages/ApiReferencePage';
import { DeveloperToolsPage } from './pages/DeveloperToolsPage';
import { PartnersPage } from './pages/PartnersPage';
import { BlogPage } from './pages/BlogPage';
import { SolutionsPage } from './pages/SolutionsPage';

// Placeholder components - will be created next
const DashboardPage = () => <div className="min-h-screen pt-16 bg-neutral-950 text-white flex items-center justify-center"><h1 className="text-4xl">Dashboard - Coming Soon</h1></div>;

function App() {
  // Mock user state - will be replaced with actual auth
  const user = null;
  
  const handleSignOut = () => {
    // Handle sign out logic
    console.log('Sign out');
  };

  return (
    <Router>
      <div className="App min-h-screen bg-neutral-950">
        <Navigation user={user} onSignOut={handleSignOut} />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/team" element={<TeamPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/tech-solutions" element={<TechSolutionsPage />} />
            <Route path="/non-tech-solutions" element={<NonTechSolutionsPage />} />
            <Route path="/solutions/tech" element={<TechSolutionsPage />} />
            <Route path="/solutions/non-tech" element={<NonTechSolutionsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/support" element={<HelpCenterPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/whitepapers" element={<WhitepapersPage />} />
            <Route path="/api" element={<ApiReferencePage />} />
            <Route path="/developer-tools" element={<DeveloperToolsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#171717',
              color: '#fff',
              border: '1px solid #404040',
            },
            success: {
              iconTheme: {
                primary: '#0ea5e9',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
