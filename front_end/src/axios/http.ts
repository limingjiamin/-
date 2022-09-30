import service from "./axios";

export default function http(
  url: string = "",
  data: object = {},
  type: string = "GET"
) {
  // 將参数处理一下
  if (Object.keys(data).length == 0) {
    return service({
      url,
      method: type,
    });
  } else {
    if (type == "GET") {
      return service({
        url,
        method: type,
        params: data,
      });
    } else {
      return service({
        url,
        method: type,
        data,
      });
    }
  }
}
