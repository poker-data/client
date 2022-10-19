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
        //  LastDate: item.LastDate,
        //  Cashes: item.Cashes,
        //  Rake: item.Rake,
        //  AvROI: item.AvROI,
        //  Entries: item.Entries,
      };
    return newData;   
    });

    const index = formattedData.map((item, index) => index);
    const dates = formattedData.map((item) => item.FirstDate);
    const profits = formattedData.map( (item) => item.Profit);
    // const cashes = formattedData.map( (item) => item.Cashes);
    // const rake = formattedData.map( (item) => item.Rake);
    // const avROI = formattedData.map( (item) => item.AvROI);
    // const entries = formattedData.map( (item) => item.Entries);

    return { index, dates, profits};
    
  }
