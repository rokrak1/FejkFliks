// src/withProtected.tsx

import { ComponentType, ElementType } from "react";
import { useAuth } from "../store/AuthProvider";
import { Navigate } from "react-router-dom";
import { LoadingIcon } from "../assets/icons/icons";

function withProtected<T extends object>(
  Component: ComponentType<T>
): ElementType {
  return function ProtectedComponent(props: T) {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-90 backdrop-blur-lg">
          <LoadingIcon size={100} color="white" />
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };
}

export default withProtected;
