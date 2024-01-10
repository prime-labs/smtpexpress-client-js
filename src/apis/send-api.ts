import { HttpService } from "../helpers/http-service";
import { MailRecipient, SendMailOptions } from "../helpers/types";

export function sendAPI(httpService: HttpService) {
  function getFormBody(options: SendMailOptions) {
    const files = [];
    if (options.attachments) {
      options.attachments.forEach((attachment) => {
        if (attachment instanceof File) files.push(attachment);
      });
    }

    if (files.length === 0) return options;

    const formData = new FormData();
    options.attachments.forEach((attachment, index) => {
      formData.append(`attachments[${index}]`, attachment as Blob);
    });
    formData.append("subject", options.subject);
    formData.append("sender[name]", options.sender.name);
    formData.append("sender[email]", options.sender.email);

    function appendRecipientToFormData(recipients: (string | MailRecipient)[]) {
      recipients.forEach((recipient: string | MailRecipient, index: number) => {
        if (typeof recipient === "object") {
          formData.append(`recipients[${index}][name]`, recipient.name);
          formData.append(`recipients[${index}][email]`, recipient.email);
        } else if (typeof recipient === "string") {
          formData.append(`recipients[${index}][name]`, "");
          formData.append(`recipients[${index}][email]`, recipient);
        }
      });
    }

    if (Array.isArray(options.recipients)) {
      appendRecipientToFormData(options.recipients);
    } else {
      appendRecipientToFormData([options.recipients]);
    }
    formData.append("message", options.message);
    if (options.template) {
      formData.append("template[id]", options.template.id);
      Object.keys(options.template.variables).forEach((variable) => {
        formData.append(
          `template[variables][${variable}]`,
          options.template.variables[variable]
        );
      });
    }

    if (options.calendarEvent) {
      Object.keys(options.calendarEvent).forEach((option) => {
        formData.append(
          `calendarEvent[${option}]`,
          options.calendarEvent[option]
        );
      });
    }
  }

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
        throw error;
      }

      if (data) {
        console.log(data);
      }

      return data;
    },
  };
}
