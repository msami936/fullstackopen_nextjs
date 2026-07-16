import NewBlogForm from "./NewBlogForm";

export default function NewBlogPage() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
        New Blog
      </h1>
      <NewBlogForm />
    </div>
  );
}
