import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Phone, Loader2 } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    setGeneralError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'សូមបញ្ចូលអ៊ីមែលរបស់អ្នក';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវទេ';
    }

    if (!formData.password) {
      newErrors.password = 'សូមបញ្ចូលពាក្យសម្ងាត់';
    } else if (formData.password.length < 6) {
      newErrors.password = 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ';
    }

    if (mode === 'register') {
      if (!formData.full_name.trim()) {
        newErrors.full_name = 'សូមបញ្ចូលឈ្មោះពេញរបស់អ្នក';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setGeneralError('');

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          phone: formData.phone || undefined,
        });
      }
    } catch (err) {
      setGeneralError(err.message || 'ប្រតិបត្តិការបរាជ័យ សូមព្យាយាមម្តងទៀត');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 overflow-hidden text-stone-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-stone-900 font-komutt-a">
              {mode === 'login' ? 'ចូលប្រើប្រាស់គណនី' : 'បង្កើតគណនីថ្មី'}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              ដើម្បីរក្សាទុក និងផ្សព្វផ្សាយធៀបឌីជីថលរបស់អ្នក
            </p>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-stone-100/80 mx-6 mt-4 rounded-xl border border-stone-200/60">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrors({});
              setGeneralError('');
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-stone-900 border border-stone-200/60'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            ចូលគណនី (Sign In)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrors({});
              setGeneralError('');
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-stone-900 border border-stone-200/60'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            ចុះឈ្មោះ (Sign Up)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {generalError && (
            <p className="text-xs text-red-600 font-medium">{generalError}</p>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                ឈ្មោះពេញ (Full Name) *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm sm:text-base transition outline-none ${
                    errors.full_name
                      ? 'border-red-500 text-red-900 focus:border-red-500'
                      : 'border-stone-200 focus:border-amber-600'
                  }`}
                />
              </div>
              {errors.full_name && (
                <p className="text-xs text-red-600 mt-1">{errors.full_name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              អ៊ីមែល (Email) *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm sm:text-base transition outline-none ${
                  errors.email
                    ? 'border-red-500 text-red-900 focus:border-red-500'
                    : 'border-stone-200 focus:border-amber-600'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                លេខទូរស័ព្ទ (Phone Number - ស្រេចចិត្ត)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-600 text-sm sm:text-base transition outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              ពាក្យសម្ងាត់ (Password) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm sm:text-base transition outline-none ${
                  errors.password
                    ? 'border-red-500 text-red-900 focus:border-red-500'
                    : 'border-stone-200 focus:border-amber-600'
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>កំពុងដំណើរការ...</span>
              </>
            ) : mode === 'login' ? (
              'ចូលគណនី (Sign In)'
            ) : (
              'បង្កើតគណនី (Sign Up)'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

