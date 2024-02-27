import moment from "moment";



export const formatToMMSS = (duration) => {
return moment.utc(duration * 1000).format("mm:ss")
}