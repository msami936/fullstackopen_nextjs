import { createBlogAction } from "../actions";

export default function NewBlogPage() {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={createBlogAction}>
        <div style={{ marginBottom: 8 }}>
          <label>
            title
            <input name="title" required style={{ marginLeft: 8 }} />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            author
            <input name="author" required style={{ marginLeft: 8 }} />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            url
            <input name="url" required style={{ marginLeft: 8 }} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
