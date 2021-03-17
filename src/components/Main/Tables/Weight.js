import cls from '../Main.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/index';
import { useTranslation } from 'react-i18next';

function Weight(props) {
  const { t } = useTranslation();

  const { data } = props;

  const deleteHandler = createdAt => {
    props.onDelete(createdAt);
  };

  const rows = data
    ? data.map((item, index) => {
        return (
          <tr key={index}>
            <td>
              {item.createdAt
                .replace('.000Z', '')
                .replace('T', ' ')
                .slice(0, 16)}
            </td>
            <td>{item.value}კგ</td>
            <td>
              <button onClick={() => deleteHandler(item.createdAt)}>
                {t('delete')}
              </button>
            </td>
          </tr>
        );
      })
    : [];

  if (rows.length === 0) {
    return <h3> {t('please add data')}</h3>;
  }

  return (
    <div className={cls.TableWrapper}>
      <table>
        <thead>
          <tr>
            <th> {t('date')}</th>
            <th> {t('weight')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId !== null,
    error: state.auth.error,
    loading: state.auth.loading !== null,
  };
};
const maiDispatchToProps = dispatch => {
  return {
    onDelete: createdAt => dispatch(actions.deleteWeight(createdAt)),
  };
};

export default connect(mapStateToProps, maiDispatchToProps)(Weight);
