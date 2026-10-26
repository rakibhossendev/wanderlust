'use client'

import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const entrance = "animate-in fade-in-0 duration-500 fill-mode-both";

export default function SignIn() {
    const router = useRouter();

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const getUserData = Object.fromEntries(formData.entries()) as { email: string, password: string }

        const { error } = await signIn.email({
            email: getUserData.email,
            password: getUserData.password
        })

        if (error?.message) {
            alert(error.message);
            return
        }

        console.log(error)

        alert("Signed in successfully");
        router.push("/")
    }

    return (
        <section className="flex w-full flex-1 items-center justify-center bg-neutral-50 px-4 py-14">
            <div className="w-full max-w-md">
                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1
                        className={`${entrance} slide-in-from-bottom-2 text-3xl font-semibold tracking-tight sm:text-4xl`}
                    >
                        Welcome Back
                    </h1>
                    <p
                        className={`${entrance} slide-in-from-bottom-2 mt-2 text-sm text-neutral-500 delay-75`}
                    >
                        Sign in to continue your adventure
                    </p>
                </div>

                {/* Card */}
                <div
                    className={`${entrance} slide-in-from-bottom-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] delay-150 sm:p-8`}
                >
                    <FieldGroup className="gap-4">
                        <form onSubmit={handleSignIn}>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Email Address
                                </FieldLabel>
                                <div className="group relative">
                                    <Mail
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-brand"
                                    />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                        className="h-10 bg-neutral-100 pl-9 transition-all focus-visible:bg-white"
                                    />
                                </div>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <div className="group relative">
                                    <Lock
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-brand"
                                    />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        className="h-10 bg-neutral-100 pl-9 transition-all focus-visible:bg-white"
                                    />
                                </div>
                            </Field>

                            <Button
                                type="submit"
                                className="h-11 w-full bg-brand text-white transition-all hover:-translate-y-0.5 hover:bg-brand/90 hover:shadow-md active:translate-y-0 active:shadow-sm"
                            >
                                Sign In
                            </Button>

                            <p className="text-center text-sm text-neutral-500">
                                Or sign in with
                            </p>

                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 w-full gap-2.5 border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fill="#4285F4"
                                        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
                                    />
                                </svg>
                                Sign In With Google
                            </Button>

                            <p className="text-center text-sm text-neutral-500">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/sign-up"
                                    className="font-semibold text-brand transition-colors hover:text-brand/80 hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </FieldGroup>
                </div>
            </div>
        </section>
    );
}
