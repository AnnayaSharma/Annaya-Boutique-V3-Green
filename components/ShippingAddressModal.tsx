'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, User, Phone, Home, Building2, Map, Hash } from 'lucide-react';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

interface ShippingAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (address: ShippingAddress) => void;
}

const INITIAL_ADDRESS: ShippingAddress = {
  fullName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

const REQUIRED_FIELDS: (keyof ShippingAddress)[] = [
  'fullName',
  'phone',
  'addressLine1',
  'city',
  'state',
  'pincode',
];

export default function ShippingAddressModal({
  isOpen,
  onClose,
  onSubmit,
}: ShippingAddressModalProps) {
  const [address, setAddress] = useState<ShippingAddress>(INITIAL_ADDRESS);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ShippingAddress, boolean>>>({});

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    // Clear error when the user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: keyof ShippingAddress) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: keyof ShippingAddress) => {
    const value = address[field].trim();
    if (REQUIRED_FIELDS.includes(field) && !value) {
      setErrors((prev) => ({ ...prev, [field]: 'This field is required' }));
      return false;
    }
    if (field === 'phone' && value && !/^[6-9]\d{9}$/.test(value)) {
      setErrors((prev) => ({ ...prev, [field]: 'Enter a valid 10-digit phone number' }));
      return false;
    }
    if (field === 'pincode' && value && !/^\d{6}$/.test(value)) {
      setErrors((prev) => ({ ...prev, [field]: 'Enter a valid 6-digit pincode' }));
      return false;
    }
    return true;
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};
    let valid = true;

    REQUIRED_FIELDS.forEach((field) => {
      if (!address[field].trim()) {
        newErrors[field] = 'This field is required';
        valid = false;
      }
    });

    if (address.phone.trim() && !/^[6-9]\d{9}$/.test(address.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
      valid = false;
    }

    if (address.pincode.trim() && !/^\d{6}$/.test(address.pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
      valid = false;
    }

    setErrors(newErrors);
    // Mark all required fields as touched
    const allTouched: Partial<Record<keyof ShippingAddress, boolean>> = {};
    REQUIRED_FIELDS.forEach((f) => (allTouched[f] = true));
    setTouched(allTouched);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(address);
      // Reset for next use
      setAddress(INITIAL_ADDRESS);
      setErrors({});
      setTouched({});
    }
  };

  const handleClose = () => {
    setAddress(INITIAL_ADDRESS);
    setErrors({});
    setTouched({});
    onClose();
  };

  const fields: {
    key: keyof ShippingAddress;
    label: string;
    placeholder: string;
    icon: React.ReactNode;
    type?: string;
    half?: boolean;
  }[] = [
    { key: 'fullName', label: 'Full Name', placeholder: 'Enter your full name', icon: <User size={16} /> },
    { key: 'phone', label: 'Phone Number', placeholder: '10-digit phone number', icon: <Phone size={16} />, type: 'tel' },
    { key: 'addressLine1', label: 'Address Line 1', placeholder: 'House no., Street, Area', icon: <Home size={16} /> },
    { key: 'addressLine2', label: 'Address Line 2 (Optional)', placeholder: 'Landmark, Colony', icon: <Building2 size={16} /> },
    { key: 'city', label: 'City', placeholder: 'City', icon: <Map size={16} />, half: true },
    { key: 'state', label: 'State', placeholder: 'State', icon: <MapPin size={16} />, half: true },
    { key: 'pincode', label: 'Pincode', placeholder: '6-digit pincode', icon: <Hash size={16} />, type: 'text' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl shadow-emerald-950/20 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 pt-6 pb-4 border-b border-emerald-100 rounded-t-[2rem]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-emerald-950">
                      Shipping Details
                    </h2>
                    <p className="text-xs text-emerald-700/60 font-medium">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-emerald-900/40 hover:text-emerald-950 hover:bg-emerald-50 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {fields.map((field, idx) => {
                  // Handle paired half-width fields
                  if (field.half) {
                    // Only render the pair once (on the first half field)
                    const pairIdx = fields.findIndex((f) => f.half);
                    if (idx !== pairIdx) return null;

                    const pair = fields.filter((f) => f.half);
                    return (
                      <div key="half-row" className="grid grid-cols-2 gap-3">
                        {pair.map((hf) => (
                          <div key={hf.key} className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                              {hf.icon}
                              {hf.label}
                            </label>
                            <input
                              type={hf.type ?? 'text'}
                              value={address[hf.key]}
                              onChange={(e) => handleChange(hf.key, e.target.value)}
                              onBlur={() => handleBlur(hf.key)}
                              placeholder={hf.placeholder}
                              className={`w-full h-12 px-4 rounded-xl border text-sm font-medium text-emerald-950 placeholder:text-emerald-400/50 outline-none transition-all focus:ring-2 focus:ring-emerald-200 ${
                                errors[hf.key] && touched[hf.key]
                                  ? 'border-red-300 bg-red-50/50'
                                  : 'border-emerald-900/10 bg-emerald-50/30 focus:border-emerald-500'
                              }`}
                            />
                            {errors[hf.key] && touched[hf.key] && (
                              <span className="text-[10px] font-medium text-red-500">{errors[hf.key]}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <div key={field.key} className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                        {field.icon}
                        {field.label}
                      </label>
                      <input
                        type={field.type ?? 'text'}
                        value={address[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        onBlur={() => handleBlur(field.key)}
                        placeholder={field.placeholder}
                        className={`w-full h-12 px-4 rounded-xl border text-sm font-medium text-emerald-950 placeholder:text-emerald-400/50 outline-none transition-all focus:ring-2 focus:ring-emerald-200 ${
                          errors[field.key] && touched[field.key]
                            ? 'border-red-300 bg-red-50/50'
                            : 'border-emerald-900/10 bg-emerald-50/30 focus:border-emerald-500'
                        }`}
                      />
                      {errors[field.key] && touched[field.key] && (
                        <span className="text-[10px] font-medium text-red-500">{errors[field.key]}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-14 mt-2 bg-emerald-950 text-white rounded-full font-bold uppercase tracking-widest hover:bg-emerald-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/20"
              >
                <MapPin size={18} />
                Continue to Order
              </button>

              <p className="text-center text-[10px] text-emerald-700/40 uppercase tracking-widest font-medium pb-2">
                Your details are shared only via WhatsApp
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
