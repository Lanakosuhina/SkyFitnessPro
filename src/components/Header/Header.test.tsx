import renderer from "react-test-renderer";
import Header from './Header';

describe('Компонент шапки приложения', () => {

  it('корректно рендериться', () => {
    const component = renderer.create(
      <Header />).toJSON();
    expect(component).toMatchSnapshot();
  });

});