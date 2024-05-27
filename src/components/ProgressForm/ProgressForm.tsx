'use client';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import FieldProgressForm from './FieldProgressForm';
import SuccessModal from '../SuccessModal/SuccessModal';
import { ExerciseArrayType } from '@/app/workout/[course]/[courseid]/[id]/page';

type ProgressFormType = {
  isOpen: boolean;
  exercises: ExerciseArrayType[];
  setExercises: React.Dispatch<React.SetStateAction<ExerciseArrayType[]>>;
  handleSaveChanges: () => void;
};
export default function ProgressForm({
  exercises,
  setExercises,
  handleSaveChanges,
  isOpen,
}: ProgressFormType) {
  useEffect(() => setExercises(exercises), [exercises, setExercises]);

  return (
    <div className="relative">
      {isOpen ? (
        <div className="fixed top-[calc(50%-(252px/2))] left-[calc(50%-(343px/2))] lg:top-[calc(50%-(278px/2))] lg:left-[calc(50%-(426px/2))]">
          <SuccessModal />
        </div>
      ) : (
        <>
          <div
            className="fixed top-[calc(50%-(487px/2))] left-[calc(50%-(343px/2))] lg:top-[calc(50%-(596px/2))] lg:left-[calc(50%-(426px/2))]
       bg-white  rounded-[30px] shadow-def w-[343px] p-[30px] lg:w-[426px] lg:p-10 "
          >
            <h3 className="font-skyeng text-[32px] text-black mb-12">
              Мой прогресс
            </h3>
            <fieldset className="w-[237px] lg:w-[320px] max-h-[350px]  mb-[34px] overflow-y-scroll">
              {exercises.map((exercise, i) => {
                return (
                  <FieldProgressForm
                    label={exercise[1].name}
                    key={i}
                    id={exercise[0]}
                    value={exercise[1].curProgress}
                    onChange={e =>
                      setExercises(prev =>
                        prev.map(item =>
                          item[1].name === exercise[1].name
                            ? [
                                item[0],
                                {
                                  ...item[1],
                                  curProgress: Number(e.target.value),
                                },
                              ]
                            : item,
                        ),
                      )
                    }
                  />
                );
              })}
            </fieldset>
            <Button title="Сохранить" onClick={handleSaveChanges} />
          </div>
        </>
      )}
    </div>
  );
}
