import Link from "next/link";
import * as motion from "framer-motion/client";
import SignInForm from "@/components/login/SignInForm";
import SocialButtonSignIn from "@/components/login/SocialButtonsSignIn";

export default function SignInPage() {
  return (
    <motion.div
      className=" px-4 flex flex-col sm:block"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: [0.2, 0.4, 0.6, 0.8, 1] }}
      transition={{
        duration: 1,
        opacity: {
          duration: 0.5,
        },
        y: {
          duration: 0.5,
        },
      }}
    >
      <SocialButtonSignIn />
      <p className=" text-center my-2 sm:my-4">OR</p>

      <div className="max-w-sm mx-auto">
        <h2 className=" text-center mb-1">Login to your Board Games account</h2>
        <SignInForm />

        <div className=" mt-4">
          <Link href="/sign-up">Dont have an account? Sign Up</Link>
        </div>
      </div>
    </motion.div>
  );
}
