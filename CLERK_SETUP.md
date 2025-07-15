# Clerk Authentication Setup

## Installation

You'll need to install the Clerk React package:

```bash
npm install @clerk/clerk-react
```

## Clerk Dashboard Setup

1. Sign up for a Clerk account at https://clerk.com
2. Create a new application in your Clerk dashboard
3. Get your publishable key from the API Keys section
4. Update your `.env.local` file with your actual Clerk keys:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here
```

## Configuration Complete

The following components have been integrated with Clerk:

- **ClerkAuth.jsx**: Contains Clerk provider and authentication components
- **main.jsx**: Wrapped app with ClerkAuthProvider
- **App.jsx**: Protected routes with AuthWrapper
- **UserContext.jsx**: Integrated with Clerk user data
- **Navbar.jsx**: Uses Clerk's UserButton component

## Features Enabled

- Sign in/sign up forms with Clerk's pre-built components
- User profile management through Clerk's UserButton
- Protected routes that require authentication
- Real user data integration (name, email, avatar, etc.)
- Automatic logout handling

## Usage

Once you add your Clerk keys and install the package, your app will:

1. Show a sign-in form for unauthenticated users
2. Display the main app content for authenticated users
3. Show a user profile button in the navbar
4. Sync user data automatically with your UserContext

The authentication is now fully integrated and ready to use!
