import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  cycle_id: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  cycle_id?: string;
}

type ValidationRule = (value: string) => string | undefined;

const required = (fieldName: string): ValidationRule => 
  (value) => value.trim() ? undefined : `${fieldName} is required`;

const validEmail: ValidationRule = (value) => 
  /\S+@\S+\.\S+/.test(value) ? undefined : 'Email is invalid';

const validationRules: Record<keyof FormData, ValidationRule[]> = {
  firstName: [required('First name')],
  lastName: [required('Last name')],
  email: [required('Email'), validEmail],
  cycle_id: [required('Cycle ID')]
};

const validateField = (field: keyof FormData, value: string): string | undefined => {
  const fieldRules = validationRules[field];
  for (const rule of fieldRules) {
    const error = rule(value);
    if (error) return error;
  }
  return undefined;
};

const useFormValidation = (formData: FormData) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = Object.keys(formData).reduce((acc, field) => {
      const error = validateField(field as keyof FormData, formData[field as keyof FormData]);
      return error ? { ...acc, [field]: error } : acc;
    }, {});

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};

export default useFormValidation;