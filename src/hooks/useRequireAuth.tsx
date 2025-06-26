import { AuthForm } from "@/components/forms/AuthForm";
import { useSession } from "next-auth/react";
import { JSX, useCallback, useMemo, useState } from "react";

type UseRequireAuthReturn = {
  authenticated: boolean;
  requireAuth: (onAuthenticated?: () => void) => void;
  AuthModal: JSX.Element;
};

export function useRequireAuth(): UseRequireAuthReturn {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(
    null,
  );

  const authenticated = useMemo(() => !!session?.user, [session]);

  const requireAuth = useCallback(
    (onAuthenticated?: () => void) => {
      if (status === "loading") {
        console.log("Authentication status loading, deferring action.");
        setPendingCallback(() => onAuthenticated || null);
        setIsModalOpen(true);
        return;
      }

      if (authenticated) {
        onAuthenticated?.();
        setIsModalOpen(false);
        setPendingCallback(null);
      } else {
        setPendingCallback(() => onAuthenticated || null);
        setIsModalOpen(true);
      }
    },
    [authenticated, status],
  );

  const AuthModal = (
    <AuthForm
      onSuccess={() => {
        setIsModalOpen(false);
        if (pendingCallback) {
          pendingCallback();
          setPendingCallback(null);
        }
      }}
      show={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
  );

  return { authenticated, requireAuth, AuthModal };
}
