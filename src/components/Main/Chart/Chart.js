import { Line } from 'react-chartjs-2';
import cls from '../Main.module.css';

function Chart(props) {
  const chartData = {
    labels: props.datalist
      ? props.datalist.map(item =>
          item.createdAt.replace('.000Z', '').replace('T', ' ').slice(0, 16)
        )
      : [],
    datasets: [
      {
        label: 'წონა',
        data: props.datalist ? props.datalist.map(item => item.value) : [],
        backgroundColor: ['rgb(4, 122, 219)'],
        borderWirdth: 4,
      },
    ],
  };

  return (
    <div className={cls.ChartWrapper}>
      <Line data={chartData} />
    </div>
  );
}
export default Chart;
