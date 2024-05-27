'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/Modal/Modal';
import WrapperModal from '@/components/WrapperModal/WrapperModal';
import FormInput from '@/components/FormInput/FormInput';
// import ButtonLink from "@/components/ButtonLink/ButtonLink";
import { getAuth, updatePassword } from "firebase/auth";
import { app } from "../../firebase";
import Button from "@/components/Button/Button";
import { ChangePasswordType } from "@/types";

export default function ResetPage() {
  const router = useRouter();
  const auth = getAuth(app);

  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState<ChangePasswordType>({
    password: '',
    repeatPassword: '',
  });

  const handleUpdatePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword.password.length < 6) {
      return setError('Не менее 6 символов');
    }
    if (!newPassword.password) {
      return setError('Введите пароль');
    }
    if (!newPassword.repeatPassword) {
      return setError('Повторите пароль');
    }
    if (newPassword.password !== newPassword.repeatPassword) {
      return setError('Пароли не совпадают');
    }

    const currentUser = auth.currentUser;

    if (currentUser !== null) {
      updatePassword(currentUser, newPassword.password)
        .then(() => {
          // Update successful.
          console.log('success1');
          return router.replace('/profile');
        })
        .catch(error => {
          // An error ocurred
          // ...
        });
    }
  };

  return (
    <Modal>
      <WrapperModal onSubmit={e => handleUpdatePassword(e)}>
        <div className="mb-[34px]">
          <FormInput
            onChange={e =>
              setNewPassword({ ...newPassword, password: e.target.value })
            }
            value={newPassword.password}
            type="password"
            name="password"
            placeholder="Новый пароль"
          />

          <FormInput
            onChange={e =>
              setNewPassword({ ...newPassword, repeatPassword: e.target.value })
            }
            value={newPassword.repeatPassword}
            type="password"
            name="password"
            placeholder="Повторите пароль"
          />
          <p className="text-red mb-[4px]">{error ? error : ''}</p>
        </div>

        <div className="space-y-2.5">
          <Button title="Подтвердить" type="submit" />
        </div>
      </WrapperModal>
    </Modal>
  );
}
