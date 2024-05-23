export const  calculateTimeDifference=(isoString)=>{
  const pastDate = new Date(isoString);
  const now = new Date();

  const timeDiff = now.getTime() - pastDate.getTime(); // Độ chênh lệch thời gian tính bằng miligiây

  // Chuyển đổi độ chênh lệch thời gian sang ngày, giờ, phút, giây
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const weeksDiff = Math.floor(daysDiff / 7);
  const monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)); // Tính toán số tháng
  const yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365)); // Tính toán số năm

  return {
    seconds: secondsDiff,
    minutes: minutesDiff,
    hours: hoursDiff,
    days: daysDiff,
    weeks: weeksDiff,
    months: monthsDiff,
    years: yearsDiff
  };
  }