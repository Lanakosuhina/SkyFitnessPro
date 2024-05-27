'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss(e: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
    if (dialogRef.current === e.target) {
      router.back();
    }
  }

  return createPortal(
    <dialog
      id="dialog"
      ref={dialogRef}
      className="fixed rounded-[30px] left-[calc(50%-(343px/2))] md:left-[calc(50%-(370px/2))] top-[calc(50%-(439px/2))]"
      onClick={e => onDismiss(e)}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root')!,
  );
}
