//dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。

export function timeAgo(dateTimeStamp) { 
  const minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const halfamonth = day * 15;
  const month = day * 30;

  const now = new Date().getTime(); //获取当前时间毫秒
  const diffValue = now - dateTimeStamp //时间差

  if (diffValue < 0) {
    return;
  }

  const minC = diffValue / minute; //计算时间差的分，时，天，周，月
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  const monthC = diffValue / month;

  let result

  if (monthC >= 1) {
    result = " " + parseInt(monthC) + "月前"
  } else if (weekC >= 1) {
    result = " " + parseInt(weekC) + "周前"
    
  } else if (dayC >= 1) {
    result = " " + parseInt(dayC) + "天前"
  } else if (hourC >= 1) {
    result = " " + parseInt(hourC) + "小时前"
  } else if (minC >= 1) {
    result = " " + parseInt(minC) + "分钟前"
  } else {
    result = "刚刚";
  }

  return result
}
