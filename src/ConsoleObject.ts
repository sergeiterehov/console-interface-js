
export class ConsoleObject {
    public id?: string;
    public classes: string[];

    private parentNode?: ConsoleObject;
    private childrenNodes: ConsoleObject[];
    private internalContent: string;

    constructor(parent?: ConsoleObject, id?: string, classes?: string[]) {
        this.id = id;
        this.classes = classes ? classes.slice() : [];
        this.childrenNodes = [];
        this.internalContent = "";

        // Setters here
        this.parent = parent;
    }

    public get type(): string {
        throw new Error("Undefined type of ConsoleObject");
    }

    public handlerObjectChange = () => {
        let node: ConsoleObject = this;

        while (node.parent) {
            node = node.parent;
        }

        node.handlerObjectChange();
    }

    public get children(): ConsoleObject[] {
        return this.childrenNodes.slice();
    }

    public get parent(): ConsoleObject|undefined {
        return this.parentNode;
    }

    public set parent(parentNode: ConsoleObject|undefined) {
        if (this.parentNode) {
            this.parentNode.childrenNodes.splice(this.parentNode.childrenNodes.indexOf(this), 1);
        }

        this.parentNode = parentNode;

        if (! parentNode) {
            return;
        }

        if (-1 === parentNode.childrenNodes.indexOf(this)) {
            parentNode.childrenNodes.push(this);
        }

        parentNode.handlerObjectChange();
    }

    public set content(text: string) {
        this.internalContent = text;

        this.handlerObjectChange();
    }

    public get content(): string {
        return this.internalContent + this.childrenNodes.map((object) => object.content).join("");
    }
}
