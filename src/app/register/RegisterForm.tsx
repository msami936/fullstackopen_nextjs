"use client";

import { useActionState } from "react";
import { registerUser, type RegisterState } from "./actions";

const initialState: RegisterState = {};

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState,
  );

  return (
    <form
      action={formAction}
      key={JSON.stringify(state.values ?? {})}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-slate-700"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={state.values?.username}
          className={inputClass}
        />
        {state.errors?.username && (
          <p
            data-testid="username-error"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.username}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={state.values?.name}
          className={inputClass}
        />
        {state.errors?.name && (
          <p data-testid="name-error" className="mt-1 text-sm text-red-600">
            {state.errors.name}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={inputClass}
        />
        {state.errors?.password && (
          <p
            data-testid="password-error"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.password}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="passwordConfirm"
          className="block text-sm font-medium text-slate-700"
        >
          Confirm Password
        </label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          className={inputClass}
        />
        {state.errors?.passwordConfirm && (
          <p
            data-testid="passwordConfirm-error"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.passwordConfirm}
          </p>
        )}
      </div>
      <button
        type="submit"
        data-testid="register-button"
        disabled={pending}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {pending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
