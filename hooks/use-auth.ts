// hooks/use-auth.ts
import { useEffect, useState, useCallback } from "react";
// For web, replace with localStorage
// import localStorage from ...

export interface User {
  id: string;
  email: string;
  name?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);

      // Pull token from SecureStore
      const token = "token-123";

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Validate token with your API
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    refresh: loadUser,
  };
}
