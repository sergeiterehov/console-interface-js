import { ConsoleObject } from "./ConsoleObject";

export class ContainerElement extends ConsoleObject {
    public get type(): string {
        return "container";
    }
}

export class TextElement extends ConsoleObject {
    public get type(): string {
        return "text";
    }
}
