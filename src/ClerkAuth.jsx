import React from 'react';
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export function ClerkAuthProvider({ children }) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  );
}

// Sign-in page component
export function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your saved properties and personalized features
          </p>
        </div>
        <SignIn
          routing="path"
          path="/sign-in"
          redirectUrl="/"
          afterSignInUrl="/"
        />
      </div>
    </div>
  );
}

export function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our platform to save properties and get personalized recommendations
          </p>
        </div>
        <SignUp
          routing="path"
          path="/sign-up"
          redirectUrl="/"
          afterSignUpUrl="/"
        />
      </div>
    </div>
  );
}

// Auth button for navbar
export function AuthButton() {
  return (
    <>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
          afterSignOutUrl="/"
        />
      </SignedIn>
      <SignedOut>
        <div className="flex gap-2">
          <a
            href="/sign-in"
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign In
          </a>
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

// Component to protect routes that require authentication
export function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to access this page.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/sign-in"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign In
              </a>
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
