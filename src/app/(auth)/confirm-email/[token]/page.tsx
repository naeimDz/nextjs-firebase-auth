import EmailConfirmation from "@/components/auth/EmailConfirmation/EmailConfirmation"

export default function EmailConfirmationPage({
  params
}: {
  params: { token: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Email Confirmation
        </h2>
        <EmailConfirmation token={params.token} />
      </div>
    </div>
  )
}