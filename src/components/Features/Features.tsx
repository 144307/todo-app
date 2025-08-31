import "./Features.css";

interface Props {
  showHints: boolean;
  toggleHints: () => void;
}

function Features({ showHints: showHints, toggleHints: toggleHints }: Props) {
  return showHints ? (
    <div className="features">
      <button className="close-hints" onClick={toggleHints}></button>
      <h2 className="hints-heading">Дополнительные функции</h2>
      <ul className="list">
        <li className="list-item">Выбор сложности для задачи</li>
        <li className="list-item">
          Крайние кнопки в селекторе имеют увеличенные хитбоксы
        </li>
        <li className="list-item">
          При повторном наведении на кнопку выбора сложности появляется
          подсказка для удаления уровня сложности
        </li>
        <li className="list-item">
          Сложность задачи отображается цветом соответствующей сложности
        </li>
        <li className="list-item">
          Поле для написания текста задачи адаптировано для любой длины текста
        </li>
        <li className="list-item">
          Текст в задачах можно менять с помощью двойного клика по нему
        </li>
        <li className="list-item">Выбор сложности для задачи</li>
      </ul>
    </div>
  ) : (
    <button className="hints-open" onClick={toggleHints}>
      Показать дополнительные функции
    </button>
  );
}

export default Features;
