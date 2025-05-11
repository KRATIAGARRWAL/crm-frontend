import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Login with Google</h2>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            localStorage.setItem("user", JSON.stringify(decoded));
            window.location.href = "/";
          }}
          onError={() => {
            alert("Login Failed");
          }}
        />
      </div>
    </div>
  );
}
