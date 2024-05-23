"use client";

import WrapperModal from "@/components/WrapperModal/WrapperModal";
import FormInput from "@/components/FormInput/FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import { signIn } from "../api";
import ModalNewPassword from "@/components/ModalNewPassword/ModalNewPasword";
import { error } from "console";

export type DataUserType = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [errorText, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState<DataUserType>({
    email: "",
    password: "",
  });

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    if (!userData.email || !userData.password) return;

    const { error } = await signIn(userData);

    if (error) {
      return setError(true);
    }

    return router.replace("/");
  };

  return (
    <>
      <WrapperModal onSubmit={(event) => handleForm(event)}>
        <div className="mb-[34px]">
          <FormInput
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            type="text"
            name="login"
            placeholder="Логин"
          />

          <FormInput
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
            type="password"
            name="password"
            placeholder="Пароль"
          />

          {errorText && <p className="text-rose-500 text-center mt-1">Логин и пароль не совпадают.
            <span className="underline"
              onClick={() => setIsOpen(true)}
            >Восстановить пароль?</span></p>}
          {isOpen && <ModalNewPassword email={userData.email} />}
        </div>

        <div className="space-y-2.5">
          <Button type="submit" title="Войти" />
          <ButtonLink title="Зарегистрироваться" link="/signup" />
        </div>
      </WrapperModal>
    </>
  );
}
