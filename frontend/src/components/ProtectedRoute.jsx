import { useAuth, SignIn } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();


  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded-xl">
          <SignIn routing="virtual" />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
