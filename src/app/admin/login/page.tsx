export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f4ef] p-6">
      <form action="/api/admin/login" method="post" className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold">Admin login</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Development account comes from ADMIN_EMAIL and ADMIN_PASSWORD.</p>
        <label className="mt-6 block text-sm font-semibold">Email<input name="email" type="email" defaultValue="admin@jbexecutivesuites.test" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
        <label className="mt-4 block text-sm font-semibold">Password<input name="password" type="password" defaultValue="change-me-in-production" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
        <button className="mt-6 w-full rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">Sign in</button>
      </form>
    </main>
  );
}
