export const parseSecondstoDate = (date) => {
    let dateObj = new Date(date * 1000);
    let dateResult = dateObj.getDate()+
        "/"+(dateObj.getMonth()+1)+
        "/"+dateObj.getFullYear()
    return dateResult;
  }

//Funcion para precision de decimales
export const  financial = (x) => {
  return Number.parseFloat(x).toFixed(2);
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

    //const index = formattedData.map((item, index) => index);
    const dates = formattedData.map((item) => item.FirstDate);
    const profits = formattedData.map( (item) => item.Profit);
    // const cashes = formattedData.map( (item) => item.Cashes);
    // const rake = formattedData.map( (item) => item.Rake);
    // const avROI = formattedData.map( (item) => item.AvROI);
    // const entries = formattedData.map( (item) => item.Entries);

    return { dates, profits};
    
  }


  // export const formatDataSetLineChart = (data) => {

  //   let plot_data = []
  //   let x = []
  //   let y = []
  //   let total = 0;
  //   data.map((item) => {
      
  //       x.push(parseSecondstoDate(item.FirstDate))
  //       total = total + parseFloat(item.Profit)
  //       console.log(financial(total))
  //       y.push(financial(total).toString())

          
  //   })
  //   plot_data['x'] = x;
  //   plot_data['y'] = y;

  //   return { plot_data };
    
  // }

  export const formatDataSetLineChart = (data) => {

    let total = 0;

    const dates = data.map((item) => parseSecondstoDate(item.FirstDate));
    const profits = data.map( (item) => {
      total = total + parseFloat(item.Profit)
      return total;
    });
    

    return { dates, profits };

  }

