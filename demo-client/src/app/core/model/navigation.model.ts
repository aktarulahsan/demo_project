import { Resource } from './resource.model';

export class Navigation extends Resource {
    displayName: string;
    route: string;
    iconName: string;
    children?: Navigation[];
}
