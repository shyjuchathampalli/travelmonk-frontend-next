export default function EmailVerified() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Email Verified Successfully 🎉
        </h2>
        <p className="mt-4 text-gray-600">
          You can now login to your account.
        </p>
      </div>
    </div>
  );
}