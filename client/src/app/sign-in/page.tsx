import Link from "next/link";
import * as motion from "framer-motion/client";
import SignInForm from "@/components/login/SignInForm";

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
      <div className=" inline-flex sm:flex justify-center flex-col sm:flex-row mx-auto">
        <motion.button
          type="button"
          className="social-btn bg-[#3b5998] hover:bg-[#3b5998]/90"
          whileHover={{ scale: 1.1 }}
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 8 19"
          >
            <path
              fillRule="evenodd"
              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with Facebook
        </motion.button>
        <motion.button
          type="button"
          className="social-btn bg-[#1da1f2] hover:bg-[#1da1f2]/90 "
          whileHover={{ scale: 1.1 }}
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 17"
          >
            <path
              fillRule="evenodd"
              d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with Twitter
        </motion.button>
        <motion.button
          type="button"
          className="social-btn bg-[#EA4335] hover:bg-[#EA4335]/90"
          whileHover={{ scale: 1.1 }}
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with Google
        </motion.button>
      </div>

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
