import ProfileDetails from "@/components/profile/ProfileDetails";
import * as motion from "framer-motion/client";

export default function ProfilePage() {
  return (
    <motion.div
      className="mx-auto text-center flex justify-center flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <h2 className=" text-3xl sm:text-4xl mb-3">My Profile</h2>
      <ProfileDetails />
    </motion.div>
  );
}
