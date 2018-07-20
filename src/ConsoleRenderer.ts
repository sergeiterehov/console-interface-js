import { ConsoleObject } from "./ConsoleObject";
import { Visualizer } from "./Visualizer";

export type TypeContentCallBack = (content: string) => void;

export class ConsoleRenderer extends ConsoleObject {
    private root: ConsoleObject;
    private visualizer: Visualizer;
    private contentCallBack: TypeContentCallBack;

    constructor(root: ConsoleObject, visualizer: Visualizer, contentCallBack: TypeContentCallBack) {
        super();

        this.root = root;
        this.visualizer = visualizer;
        this.contentCallBack = contentCallBack;

        root.parent = this;
    }

    public handlerObjectChange = () => {
        const content = this.render(this.root);

        this.contentCallBack(content);
    }

    private render(object: ConsoleObject): string {
        return this.visualizer.render(object);
    }
}
