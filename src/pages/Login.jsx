
export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Login with Google</h2>
        <a
          href="http://localhost:5000/auth/google"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login with Google
        </a>
      </div>
    </div>
  );
}
