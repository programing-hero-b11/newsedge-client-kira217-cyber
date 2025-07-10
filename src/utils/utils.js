import axios from "axios";

// upload image and return image url
export const imageUpload = async (imageData) => {
  const imageFormData = new FormData();
  imageFormData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    imageFormData
  );
  // image url response from imgbb
  return data?.data?.display_url;
};

// // save or update user in db
export const saveUserInDb = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    user
  );

  console.log(data);
};

//  Check if premium subscription is expired

export const isPremiumExpired = (premiumTaken, subscriptionPeriod) => {
  if (!premiumTaken || !subscriptionPeriod) return true;
  const expireTime =
    new Date(premiumTaken).getTime() + Number(subscriptionPeriod);
  return new Date().getTime() > expireTime;
};

export const handlePremiumExpiry = async (user, axiosSecure, redirect) => {
  if (!user?.email) return;

  try {
    const res = await axiosSecure.get(`/user/check-expiry?email=${user.email}`);

    // যদি expired হয় তাহলে রিডাইরেক্ট করো
    if (res.data?.expired) {
      redirect("/subscription"); // Automatically navigate
    }
  } catch (err) {
    console.error("Premium check failed", err);
  }
};
