export class Resource {
  id!: number;
  success: boolean = true;
  info: boolean = false;
  warning: boolean = false;
  message!: string;
  valid: boolean = false;
  obj: any;
}
