// ====================================================================
// FILE: ClerkAuth.jsx
// LOCATION: /src/ClerkAuth.jsx
// PURPOSE: Clerk authentication integration and auth-related components
// DESCRIPTION: Provider setup, sign-in/up pages, and route protection
// ====================================================================

// React core import for component functionality
import React from 'react';
// Clerk authentication library imports for auth components and hooks
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
// React Router navigation hook for programmatic routing
import { useNavigate } from 'react-router-dom';

// ====================================================================
// ENVIRONMENT CONFIGURATION SECTION
// LOCATION: Top of ClerkAuth.jsx file
// PURPOSE: Load and validate Clerk authentication keys
// ====================================================================

// Environment variable: Clerk publishable key from .env file
// USAGE: Required for Clerk authentication service initialization
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Validation: Ensure publishable key is configured
// PURPOSE: Prevent runtime errors due to missing authentication configuration
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// ====================================================================
// CLERK PROVIDER COMPONENT: ClerkAuthProvider
// PURPOSE: Wrap application with Clerk authentication context
// LOCATION: Used in main.jsx to provide auth context to entire app
// PROPS: children - React components to wrap with auth context
// ====================================================================
export function ClerkAuthProvider({ children }) {
  // ================================================================
  // NAVIGATION HOOK SECTION
  // LOCATION: Top of ClerkAuthProvider component
  // ================================================================

  // React Router navigation hook for Clerk's internal navigation
  const navigate = useNavigate();

  // ================================================================
  // PROVIDER RENDER SECTION
  // LOCATION: Return statement of ClerkAuthProvider
  // ================================================================
  return (
    // ============================================================
    // CLERK PROVIDER: Main authentication context provider
    // CONFIGURATION: Publishable key and navigation integration
    // ============================================================
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY} // Clerk service authentication key
      navigate={(to) => navigate(to)} // Integrate with React Router navigation
    >
      {children} {/* Render wrapped application components */}
    </ClerkProvider>
  );
}

// ====================================================================
// SIGN-IN PAGE COMPONENT: SignInPage
// PURPOSE: Dedicated page for user authentication/login
// LOCATION: Rendered at /sign-in route
// USAGE: Full-page sign-in interface with Clerk integration
// ====================================================================
export function SignInPage() {
  // ================================================================
  // COMPONENT RENDER SECTION
  // LOCATION: Return statement of SignInPage
  // ================================================================
  return (
    // ============================================================
    // SIGN-IN PAGE CONTAINER: Full-screen centered layout
    // STYLING: Minimum height screen with centered content
    // ============================================================
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      {/* ========================================================
          SIGN-IN CONTENT WRAPPER: Constrained width container
          STYLING: Max width with vertical spacing
          ======================================================== */}
      <div className="max-w-md w-full space-y-8">

        {/* ====================================================
            SIGN-IN HEADER SECTION: Page title and description
            LOCATION: Above Clerk sign-in component
            ==================================================== */}
        <div className="text-center">
          {/* Main heading for sign-in page */}
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          {/* Descriptive text explaining sign-in benefits */}
          <p className="mt-2 text-sm text-gray-600">
            Access your saved properties and personalized features
          </p>
        </div>

        {/* ====================================================
            CLERK SIGN-IN COMPONENT: Actual authentication form
            CONFIGURATION: Routing and redirect URLs
            ==================================================== */}
        <SignIn
          routing="virtual" // Use virtual routing (handled by React Router)
          signUpUrl="/sign-up" // Link to sign-up page
          afterSignInUrl="/" // Redirect to home after successful sign-in
          redirectUrl="/" // Fallback redirect URL
        />
      </div>
    </div>
  );
}

// ====================================================================
// SIGN-UP PAGE COMPONENT: SignUpPage
// PURPOSE: Dedicated page for user registration
// LOCATION: Rendered at /sign-up route
// USAGE: Full-page registration interface with Clerk integration
// ====================================================================
export function SignUpPage() {
  // ================================================================
  // COMPONENT RENDER SECTION
  // LOCATION: Return statement of SignUpPage
  // ================================================================
  return (
    // ============================================================
    // SIGN-UP PAGE CONTAINER: Full-screen centered layout
    // STYLING: Minimum height screen with centered content
    // ============================================================
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      {/* ========================================================
          SIGN-UP CONTENT WRAPPER: Constrained width container
          STYLING: Max width with vertical spacing
          ======================================================== */}
      <div className="max-w-md w-full space-y-8">

        {/* ====================================================
            SIGN-UP HEADER SECTION: Page title and description
            LOCATION: Above Clerk sign-up component
            ==================================================== */}
        <div className="text-center">
          {/* Main heading for sign-up page */}
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          {/* Descriptive text explaining sign-up benefits */}
          <p className="mt-2 text-sm text-gray-600">
            Join our platform to save properties and get personalized recommendations
          </p>
        </div>

        {/* ====================================================
            CLERK SIGN-UP COMPONENT: Actual registration form
            CONFIGURATION: Routing and redirect URLs
            ==================================================== */}
        <SignUp
          routing="virtual" // Use virtual routing (handled by React Router)
          signInUrl="/sign-in" // Link to sign-in page
          afterSignUpUrl="/" // Redirect to home after successful sign-up
          redirectUrl="/" // Fallback redirect URL
        />
      </div>
    </div>
  );
}

// ====================================================================
// AUTH BUTTON COMPONENT: AuthButton
// PURPOSE: Reusable authentication buttons for navigation
// LOCATION: Used in navigation components
// USAGE: Shows different content based on authentication state
// NOTE: This component appears to be unused in favor of inline auth in Navbar
// ====================================================================
export function AuthButton() {
  // ================================================================
  // COMPONENT RENDER SECTION
  // LOCATION: Return statement of AuthButton
  // ================================================================
  return (
    // ============================================================
    // AUTH BUTTON CONTAINER: Conditional authentication UI
    // PURPOSE: Show different content for signed-in vs signed-out users
    // ============================================================
    <>
      {/* ========================================================
          SIGNED-IN STATE: Show user profile button
          CONDITIONAL: Only rendered when user is authenticated
          ======================================================== */}
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8" // Custom avatar size styling
            }
          }}
          afterSignOutUrl="/" // Redirect to home after sign-out
        />
      </SignedIn>

      {/* ========================================================
          SIGNED-OUT STATE: Show sign-in and sign-up links
          CONDITIONAL: Only rendered when user is not authenticated
          ======================================================== */}
      <SignedOut>
        <div className="flex gap-2">
          {/* Sign-in link - text style */}
          <a
            href="/sign-in"
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign In
          </a>
          {/* Sign-up link - filled button style */}
          <a
            href="/sign-up"
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            Sign Up
          </a>
        </div>
      </SignedOut>
    </>
  );
}

// ====================================================================
// PROTECTED ROUTE COMPONENT: ProtectedRoute
// PURPOSE: Wrapper component to protect routes requiring authentication
// LOCATION: Used in App.jsx to wrap protected pages
// PROPS: children - Components to render if user is authenticated
// USAGE: Automatically redirects unauthenticated users to sign-in
// ====================================================================
export function ProtectedRoute({ children }) {
  // ================================================================
  // COMPONENT RENDER SECTION
  // LOCATION: Return statement of ProtectedRoute
  // ================================================================
  return (
    // ============================================================
    // PROTECTED ROUTE CONTAINER: Authentication-based conditional rendering
    // PURPOSE: Show content only to authenticated users
    // ============================================================
    <>
      {/* ========================================================
          AUTHENTICATED STATE: Render protected content
          CONDITIONAL: Only shown when user is signed in
          ======================================================== */}
      <SignedIn>
        {children} {/* Render the protected page/component */}
      </SignedIn>

      {/* ========================================================
          UNAUTHENTICATED STATE: Show authentication required message
          CONDITIONAL: Only shown when user is not signed in
          ======================================================== */}
      <SignedOut>

        {/* ====================================================
            AUTH REQUIRED CONTAINER: Full-screen message layout
            STYLING: Centered content with authentication prompt
            ==================================================== */}
        <div className="min-h-screen flex items-center justify-center bg-gray-50">

          {/* ================================================
              AUTH REQUIRED CONTENT: Message and action buttons
              PURPOSE: Inform user and provide sign-in options
              ================================================ */}
          <div className="text-center">

            {/* Main heading for authentication required message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h2>

            {/* Explanatory text about sign-in requirement */}
            <p className="text-gray-600 mb-6">
              Please sign in to access this page.
            </p>

            {/* ============================================
                AUTH ACTION BUTTONS: Sign-in and sign-up options
                STYLING: Flexbox layout with button styling
                ============================================ */}
            <div className="flex gap-4 justify-center">
              {/* Sign-in button - primary action */}
              <a
                href="/sign-in"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign In
              </a>
              {/* Sign-up button - secondary action */}
              <a
                href="/sign-up"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
