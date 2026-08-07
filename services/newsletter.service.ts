export async function subscribeNewsletter(
  email: string,
): Promise<{ success: boolean; message: string }> {
  if (!email.includes("@")) {
    return { success: false, message: "Enter a valid email address" };
  }

  return {
    success: true,
    message: "You are subscribed to TRENOvA updates",
  };
}
