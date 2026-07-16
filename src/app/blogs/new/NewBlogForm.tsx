"use client";

import { useActionState, useEffect } from "react";
import { createBlogAction, type CreateBlogState } from "../actions";
import { useNotification } from "@/components/NotificationContext";

const initialState: CreateBlogState = {};

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600";

export default function NewBlogForm() {
  const [state, formAction, pending] = useActionState(
    createBlogAction,
    initialState,
  );
  const { notify } = useNotification();

  useEffect(() => {
    if (state.errors && Object.keys(state.errors).length > 0) {
      notify("Please fix the errors in the form", "error");
    }
  }, [state.errors, notify]);

  return (
    <form
      action={formAction}
      key={JSON.stringify(state.values ?? {})}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-700"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={state.values?.title}
          className={inputClass}
        />
        {state.errors?.title && (
          <p className="mt-1 text-sm text-red-600">{state.errors.title}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-slate-700"
        >
          Author
        </label>
        <input
          id="author"
          name="author"
          type="text"
          defaultValue={state.values?.author}
          className={inputClass}
        />
        {state.errors?.author && (
          <p className="mt-1 text-sm text-red-600">{state.errors.author}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-slate-700"
        >
          URL
        </label>
        <input
          id="url"
          name="url"
          type="text"
          defaultValue={state.values?.url}
          className={inputClass}
        />
        {state.errors?.url && (
          <p className="mt-1 text-sm text-red-600">{state.errors.url}</p>
        )}
      </div>
      <button
        type="submit"
        data-testid="create-blog-button"
        disabled={pending}
        className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
