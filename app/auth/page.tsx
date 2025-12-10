import { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
    title: "Sign In | TeachHub",
    description: "Sign in or create an account to access TeachHub",
};

export default function AuthPage() {
    return (
        <div className="fixed inset-0 z-50 bg-background overflow-hidden">
            <AuthForm />
        </div>
    );
}
