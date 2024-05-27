type GetErrorTextType = {
  fncSetErrorText: React.Dispatch<React.SetStateAction<string>>;
  errorCode: string;
};

export function getErrorText({ errorCode, fncSetErrorText }: GetErrorTextType) {
  switch (errorCode) {
    case 'auth/weak-password':
      fncSetErrorText(
        'Слабый пароль: пароль должен быть не менее шести символов',
      );
      break;
    case 'auth/email-already-in-use':
      fncSetErrorText('Данная почта уже используется. Попробуйте войти.');
    case 'auth/invalid-email':
      fncSetErrorText('Данная почта уже используется. Попробуйте войти.');
      break;
    case 'auth/operation-not-allowed':
      fncSetErrorText('Учетные записи электронной почты и паролей не включены');
      break;
    default:
      fncSetErrorText('Что-то пошло не так');
      break;
  }
}
