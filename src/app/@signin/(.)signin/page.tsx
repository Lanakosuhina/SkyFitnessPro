'use client';
'use client';

import FormInput from "@/components/FormInput/FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import WrapperModal from "@/components/WrapperModal/WrapperModal";
import { signIn } from "@/app/api";
import { Modal } from "@/components/Modal/Modal";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import ModalNewPassword from "@/components/ModalNewPassword/ModalNewPasword";
import { SignInUserDataType } from "@/types";

export default function SignInPage() {
  const router = useRouter();
  const [errorText, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<SignInUserDataType>({
    email: "",
    password: "",
  });

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userData.email || !userData.password) return;

    const { error } = await signIn(userData);

    if (error) {
      return setError(true);
    }

    const dialog: HTMLDialogElement | null = document.querySelector("dialog")
    dialog?.close()
  };


  function toSendPasswordResetEmail(userData: SignInUserDataType) {
    if (userData.email) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, userData.email)
        .then(() => {
          setIsOpen(true);
          setTimeout(() => {
            setIsOpen(false),
            setError(false);
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } return
  }

  return (

    <Modal>
      {isOpen ? <ModalNewPassword email={userData.email} /> :
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

            {errorText &&
              <p className="text-rose-500 text-center mt-1">Логин и пароль не совпадают. 
               <span className="underline cursor-custom"
                  onClick={() => toSendPasswordResetEmail(userData)}
                > Восстановить пароль?
                </span>
              </p>}
          </div>

          <div className="space-y-2.5">
            <Button type="submit" title="Войти" />
            <ButtonLink title="Зарегистрироваться" link="/signup" />
          </div>
          {isOpen ? <ModalNewPassword email={userData.email} /> : <></>}
        </WrapperModal>
      }
    </Modal>
  );
}
