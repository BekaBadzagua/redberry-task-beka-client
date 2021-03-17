import cls from '../Main.module.css';
function MessageBox(props) {
  const clickHandler = () => {
    props.setMessageBox({
      ...props.messageBox,
      message: '',
    });
  };

  if (!props.messageBox.message) {
    return <div></div>;
  }

  const styles = {
    backgroundColor: props.messageBox.gain
      ? 'rgb(255,146,146)'
      : 'rgb(146,255,197)',
  };

  return (
    <div className={cls.MessageBox} onClick={clickHandler} style={styles}>
      <h3>{props.messageBox.message}</h3>
    </div>
  );
}

export default MessageBox;
