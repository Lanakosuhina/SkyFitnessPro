'use client';

import WrapperModal from "@/components/WrapperModal/WrapperModal";
import FormInput from "@/components/FormInput/FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import { signUp } from "../api";
import { getErrorText } from "@/utils/getErrorText";
import { SignUpUserDataType } from "@/types";

export default function SignUpPage() {
  const router = useRouter();
  const [errorText, setError] = useState('');
  const [userData, setUserData] = useState<SignUpUserDataType>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userData.email || !userData.password || !userData.repeatPassword)
      return setError('Не все поля заполнены');

    if (userData.password !== userData.repeatPassword) {
      return setError('Пароли не совпадают');
    }

    const { error } = await signUp(userData);

    if (error) {
      return getErrorText({ errorCode: error, fncSetErrorText: setError });
    }

    return router.replace('/profile');
  };

  return (
    <WrapperModal onSubmit={event => handleForm(event)}>
      <div className="mb-[34px]">
        <FormInput
          type="text"
          name="login"
          placeholder="Эл. почта"
          value={userData.email}
          onChange={e => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />

        <FormInput
          onChange={e => setUserData({ ...userData, password: e.target.value })}
          value={userData.password}
          type="password"
          name="password"
          placeholder="Пароль"
        />

        <FormInput
          onChange={e =>
            setUserData({ ...userData, repeatPassword: e.target.value })
          }
          value={userData.repeatPassword}
          type="password"
          name="password"
          placeholder="Повторите пароль"
        />

        <p className="text-rose-500 mt-1 text-center">{errorText}</p>
      </div>

      <div className="space-y-2.5">
        <Button type="submit" title="Зарегистрироваться" />
        <ButtonLink
          title="Войти" 
          link="/signin" />
      </div>
    </WrapperModal>
  );
}
