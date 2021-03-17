import React from 'react';
import Topbar from './Topbar/Topbar';
import cls from './Layout.module.css';

export default class Layout extends React.Component {
  render() {
    return (
      <div className={cls.Main}>
        <Topbar />
        <div className={[cls.Content, 'basicWrapper'].join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
