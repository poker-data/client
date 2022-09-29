export const parseSecondstoDate = (date) => {
    let dateObj = new Date(date * 1000);
    let dateResult = dateObj.getDate()+
        "/"+(dateObj.getMonth()+1)+
        "/"+dateObj.getFullYear()
    return dateResult;
  }


export const formatDataSet = (data) => {

    let formattedData = data.map((item, index) => {
      const newData = {
         FirstDate: item.FirstDate,
         Profit: item.Profit,
      };
    return newData;   
    });

    const index = formattedData.map((item, index) => index);
    const dates = formattedData.map((item) => item.FirstDate);
    const profits = formattedData.map( (item) => item.Profit);

    return { index, dates, profits};
    
  }
