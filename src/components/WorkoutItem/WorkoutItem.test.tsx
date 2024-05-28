import renderer from "react-test-renderer";
import WorkoutItem from './WorkoutItem'

describe('Компонент input type=radio', () => {
  const mocksetSelected = jest.fn();

  it('корректно рендериться с начальными значениями', () => {
    const component = renderer.create(
      <WorkoutItem
      id={'dfhjk8'}
      isDone={false}
      workoutName={'Тренировка мышц ягодиц'}
      setSelected={mocksetSelected}
      />).toJSON();
    expect(component).toMatchSnapshot();
  });

});

