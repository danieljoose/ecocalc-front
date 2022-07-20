import moment from "moment";

const formatDate = (string) => {
  const str = moment(string).format();
  const splited = str.split("T");
  const date = splited[0].split("-").reverse().join("/");
  return `${date}`;
};
export default formatDate;
