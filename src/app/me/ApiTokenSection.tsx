"use client";

import { useEffect, useState, useTransition } from "react";
import { generateApiToken } from "./actions";

type ApiTokenSectionProps = {
  initialToken: string | null;
};

export function ApiTokenSection({ initialToken }: ApiTokenSectionProps) {
  const [token, setToken] = useState(initialToken);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setToken(initialToken);
  }, [initialToken]);

  return (
    <section data-testid="api-token-section">
      <h2 className="mb-4 text-xl font-bold text-slate-900">API Token</h2>

      <div className="mb-6 rounded-md bg-slate-50 p-4">
        <p className="mb-2 text-sm font-medium text-slate-700">Current token:</p>
        {token ? (
          <div
            data-testid="token-display"
            className="break-all rounded-md border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-slate-800"
          >
            <code data-testid="api-token">{token}</code>
          </div>
        ) : (
          <p
            data-testid="no-token-message"
            className="text-sm italic text-slate-500"
          >
            No token has been generated yet.
          </p>
        )}
      </div>

      <button
        type="button"
        data-testid="generate-token-button"
        disabled={isPending}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        onClick={() => {
          startTransition(async () => {
            const newToken = await generateApiToken();
            setToken(newToken);
          });
        }}
      >
        Generate New Token
      </button>
    </section>
  );
}
