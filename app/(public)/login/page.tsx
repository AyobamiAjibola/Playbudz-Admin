import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center flex-col">
      <div className="flex justify-center items-center flex-col">
        <span className="text-4xl font-extrabold">
          PlayBudz
        </span>
        <span className="text-slate-400 text-lg">ADMIN</span>
         <span className="text-xl font-bold mt-6">Welcome back</span>
          <span className="text-slate-400 text-md mb-4">
            Sign in to your PlayBudz admin account
          </span>
      </div>
      <LoginForm />
    </main>
  );
}