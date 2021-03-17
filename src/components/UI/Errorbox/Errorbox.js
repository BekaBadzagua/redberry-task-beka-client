import cls from './Errorbox.module.css';

function Errorbox(props) {
  const { messages, text } = props;

  if (text || text === '') {
    return <div className={cls.ErrorsWrapper}>{text}</div>;
  } else {
    const listItems = messages.map((message, index) => (
      <li key={index}>{message}</li>
    ));
    return (
      <div className={cls.ErrorsWrapper}>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default Errorbox;
