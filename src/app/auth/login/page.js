import LoginForm from '../../../components/auth/LoginForm'

export const metadata = {
  title: 'Login - Makhana Store',
  description: 'Login to your Makhana Store account to access your orders and profile',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Makhana Store</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a
              href="/auth/signup"
              className="font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              Create one here
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-sm text-green-600 hover:text-green-500 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center text-sm text-gray-600">
          <p className="mb-2">
            🌱 Premium Quality Makhana from Bihar&apos;s Finest Farms
          </p>
          <p>
            Need help? Contact us at{' '}
            <a 
              href="mailto:support@makhanastore.com" 
              className="text-green-600 hover:text-green-500"
            >
              support@makhanastore.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
