import { MailRecipient, SendMailOptions } from "./types";

export function getFormBody(options: SendMailOptions & { message?: string }) {
  if (!(options.attachments && options.attachments[0] instanceof File)) {
    return options;
  }

  const formData = new FormData();

  function appendRecipientToFormData(recipient: string | MailRecipient) {
    if (typeof recipient === "object") {
    } else if (typeof recipient === "string") {
    }
  }

  formData.append("subject", options.subject);
  formData.append("message", options.message);
  formData.append("sender[name]", options.sender.name);
  formData.append("sender[email]", options.sender.email);

  if (Array.isArray(options.recipients)) {
    options.recipients.forEach((recipient: string | MailRecipient) => {
      appendRecipientToFormData(recipient);
    });
  } else {
    appendRecipientToFormData(options.recipients);
  }

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
