
export default function Login() {
  const url="https://crm-backend-d0ny.onrender.com/auth/google"
  console.log(url);
  return (
    // <div className="flex justify-center items-center h-screen bg-gray-100">
    //   <div className="p-8 bg-white shadow-md rounded-lg text-center">
    //     {/* <h2 className="text-2xl font-semibold mb-4">Login with Google</h2> */}
        
    //   </div>
    // </div>
    
    <a
          href={url}
          
        >
          Login with Google
        </a>
  );
}
