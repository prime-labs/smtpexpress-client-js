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

export type HttpClientResolverDTO<T> = Promise<{
  data: T | null;
  error: HttpClientResolverError | null;
}>;

export type CredentialOptions = {
  projectSecret: string;
  projectId: string;
};

export type MailRecipient = {
  name?: string;
  email: string;
};

export type MailSender = Required<MailRecipient>;

export type CalendarEventOptions = {
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  location?: string;
  url?: string;
  organizer?: string;
};

export type SendMailOptions = {
  subject: string;
  sender: MailSender;
  recipients: string | string[] | MailRecipient | MailRecipient[];
  template?: {
    id: string;
    variables: Record<string, string>;
  };
  attachments?: Array<string | File>;
  calendarEvent?: CalendarEventOptions;
} & (
  | { message: string }
  | {
      template: {
        id: string;
        variables: Record<string, string>;
      };
    }
);
