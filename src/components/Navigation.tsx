import Link from "next/link";

const Navigation = () => {
  return (
    <nav style={{ padding: 10, marginBottom: 16 }}>
      <Link href="/" style={{ padding: 5 }}>
        home
      </Link>
      <Link href="/blogs" style={{ padding: 5 }}>
        blogs
      </Link>
      <Link href="/blogs/new" style={{ padding: 5 }}>
        create
      </Link>
    </nav>
  );
};

export default Navigation;
