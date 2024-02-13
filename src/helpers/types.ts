import { CreateAxiosDefaults } from "axios";

export type HttpClientConstructorParams = CreateAxiosDefaults<any>;

export type HttpClientParams<DTO, DQO> = {
  path: string;
  method: "post" | "get" | "delete" | "put" | "patch";
  body?: DTO;
  query?: DQO;
  options?: {
    handleError?: boolean;
  };
};
export type HttpClientResolverError = {
  message: string;
  statusCode: number;
};

export type HttpClientResolverDTO<T> = {
  data: T | null;
  error: HttpClientResolverError | null;
};

export type CredentialOptions = {
  projectSecret: string;
  projectId: string;
};

export type MailRecipient = {
  name?: string;
  email: string;
};

export type MailSender = Required<MailRecipient>;

export type MailTemplate = {
  id: string;
  variables: Record<string, string>;
};

export type MailAttachment = string | File | MailTemplate;

export type CalendarEventOptions = {
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  location?: string;
  url?: string;
  organizer?: string;
};

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type TSendMailOptions = {
  subject: string;
  sender: MailSender;
  recipients: string | string[] | MailRecipient | MailRecipient[];
  message?: string;
  template?: MailTemplate;
  attachments?: Array<MailAttachment>;
  calendarEvent?: CalendarEventOptions;
};

export type SendMailOptions = RequireAtLeastOne<
  TSendMailOptions,
  "message" | "template"
>;
