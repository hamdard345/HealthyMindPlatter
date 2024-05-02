const calculateDuration = (start,end) =>{
  if(start && end){
    const startTotalMinutes = start["$H"] * 60 + start["$m"];
    const endTotalMinutes = end["$H"] * 60 + end["$m"];
    const duration = endTotalMinutes-startTotalMinutes;
    
    return duration < 0 ? duration + 1440 : duration; // Handle overnight duration
  }
}
export default calculateDuration