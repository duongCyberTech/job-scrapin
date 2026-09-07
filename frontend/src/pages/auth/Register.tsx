import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import PasswordRequirements from '../../components/PasswordRequirements';

interface FormState {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Replace with your actual backend registration endpoint:
      // await axios.post('/api/auth/register', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate('/login');
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: 'Registration failed. An account with this email may already exist.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Fill in your details below to set up your profile and get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name Row: First, Middle, Last */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                First Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition ${
                  errors.firstName
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                }`}
              />
              {errors.firstName && <p className="mt-1 text-xs text-rose-500">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="middleName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Middle Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                placeholder="Robert"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Last Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition ${
                  errors.lastName
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                }`}
              />
              {errors.lastName && <p className="mt-1 text-xs text-rose-500">{errors.lastName}</p>}
            </div>
          </div>

          {/* Username & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Username <span className="text-rose-500">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe99"
                value={formData.username}
                onChange={handleChange}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition ${
                  errors.username
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                }`}
              />
              {errors.username && <p className="mt-1 text-xs text-rose-500">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition ${
                  errors.email
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-lg border pr-12 pl-3.5 py-2.5 text-sm outline-none transition ${
                    errors.password
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* Checklist and Meter */}
              <PasswordRequirements password={formData.password} />

              {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-lg border pr-12 pl-3.5 py-2.5 text-sm outline-none transition ${
                    errors.confirmPassword
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-rose-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}