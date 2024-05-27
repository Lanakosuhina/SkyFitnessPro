'use client';

import WrapperModal from '@/components/WrapperModal/WrapperModal';
import FormInput from '@/components/FormInput/FormInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';

export type ErrorType = {
  password: string[];
};

export type PasswordsType = {
  newPassword: string;
  repeatPassword: string;
};

export default function SetNewPassword() {
  const router = useRouter();

  const [errorText, setError] = useState<ErrorType>({
    password: [],
  });

  const [passwords, setPasswords] = useState<PasswordsType>({
    newPassword: '',
    repeatPassword: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace('/profile')
  };
  
  return (
    <WrapperModal onSubmit={handleSubmit}>
      <div className="mb-[34px]">
        <FormInput
          type="password"
          name="newPassword"
          placeholder="Новый пароль"
          value={passwords.newPassword}
          onChange={e => {
            setPasswords({ ...passwords, newPassword: e.target.value });
          }}
        />

        <p className="text-red-500 mb-[4px]">
          {errorText.password ? errorText.password[0] : ''}
        </p>

        <FormInput
          onChange={e =>
            setPasswords({ ...passwords, repeatPassword: e.target.value })
          }
          value={passwords.repeatPassword}
          type="password"
          name="repeatPassword"
          placeholder="Повторите пароль"
        />

        <p className="text-red-500 mb-[4px]">
          {errorText.password ? errorText.password[0] : ''}
        </p>
      </div>

      <div className="space-y-2.5">
        <Button title="Подтвердить" />
      </div>
    </WrapperModal>
  );
}
