import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ academicCount, nonAcademicCount }) => {
  const data = {
    labels: ['Akademik', 'Non-Akademik'],
    datasets: [
      {
        data: [academicCount, nonAcademicCount],
        backgroundColor: ['#176B87', '#64CCC5'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
