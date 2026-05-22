"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      alert("Account created successfully! Please log in.");
      router.push("/login");
    } catch (error: any) {
      setErrors({ email: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/8 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 shadow-2xl shadow-black/20 sm:p-10">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="group inline-flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-110">
                <Zap className="h-6 w-6" />
              </span>
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent">
                TechNest
              </span>
            </Link>
            <h1 className="mt-6 text-2xl font-extrabold text-[var(--text-primary)]">
              Create an Account
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Join TechNest and start shopping smarter
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={`w-full rounded-xl border bg-[var(--background-secondary)] py-3 pl-11 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-200 focus:ring-2 ${
                    errors.name
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[var(--border-color)] focus:border-violet-500 focus:ring-violet-500/20"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border bg-[var(--background-secondary)] py-3 pl-11 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-200 focus:ring-2 ${
                    errors.email
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[var(--border-color)] focus:border-violet-500 focus:ring-violet-500/20"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className={`w-full rounded-xl border bg-[var(--background-secondary)] py-3 pl-11 pr-12 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-200 focus:ring-2 ${
                    errors.password
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[var(--border-color)] focus:border-violet-500 focus:ring-violet-500/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm"
                className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  id="signup-confirm"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={`w-full rounded-xl border bg-[var(--background-secondary)] py-3 pl-11 pr-12 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all duration-200 focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[var(--border-color)] focus:border-violet-500 focus:ring-violet-500/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-violet-400 hover:text-violet-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-violet-400 hover:text-violet-300">
                Privacy Policy
              </a>
              .
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? "Creating Account..." : "Create Account"}
                {!isSubmitting && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--border-color)]" />
            <span className="text-xs text-[var(--text-muted)]">or</span>
            <div className="h-px flex-1 bg-[var(--border-color)]" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-[var(--text-muted)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-violet-400 transition-colors hover:text-violet-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
