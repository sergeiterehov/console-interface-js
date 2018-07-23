import { ConsoleObject } from "./ConsoleObject";

export enum Color {
    Black,
    White,
}

export interface IViewRuleSelector {
    type?: string;
    id?: string;
    classes: string[];
    rules: IViewRule;
}

export interface IViewRule {
    color?: {
        font?: Color;
        background: Color;
    };
    inside?: IViewRuleSelector[];
}

export class Visualizer {
    private rules: IViewRule;

    constructor(rules: IViewRule) {
        this.rules = rules;
    }

    public render(object: ConsoleObject, parentRule: IViewRule): string {
        const rule = this.mergeRule(parentRule, {});

        return object.content + object.children.map((child) => this.render(child, rule)).join("");
    }

    private mergeRule(parent: IViewRule, child: IViewRule): IViewRule {
        return {};
    }
}
