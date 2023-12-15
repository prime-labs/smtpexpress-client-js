import { getFormBody } from "../helpers/form-body";
import { HttpService } from "../helpers/http-service";
import { SendMailOptions } from "../helpers/types";

export function sendAPI(httpService: HttpService) {
  return {
    async sendMail(options: SendMailOptions) {
      const { data, error } = await httpService.SendRequest<{
        message: string;
      }>({
        method: "post",
        path: "/send",
        body: getFormBody(options),
      });

      if (error) {
        console.error(error);
      }

      if (data) {
        console.log(data);
      }

      return data;
    },
  };
}
