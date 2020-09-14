
export const renderDate = (date) => {
    let current_datetime = new Date(date)
    return current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
  }