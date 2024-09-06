declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

interface ScriptLoaderProps {
    scripts: string | string[];
}

interface ScriptLoaderState {
    properties: ScriptLoaderProps;
}

interface Coeffects {
    dispatch: () => any;
    updateState: (state: any) => void;
    updateProperties(properties: any): void;
}

declare module '@servicenow/ui-renderer-snabbdom' {
    const snabbdom: any; // Replace 'any' with the specific type if known
    export default snabbdom;
}

declare module '@servicenow/ui-core' {
    // @servicenow/ui-core type definitions
    // TypeScript Version: 3.7

    export function createCustomElement(elementName: string, config: ComponentConfig): void;
    export function createPresentationalCustomElement(elementName: string, config: PresentationalConfig): void;

    interface PresentationalConfig {
        /** The properties used by a custom element */
        properties?: {
            [key: string]: PropertyConfig;
        };

        /** Behaviors applied to the custom element */
        behaviors?: Array<object>;

        /** A function that renders transformed component state and properties to virtual DOM */
        view?: Function;

        /** Options applied to the shadowRoot of a custom element **/
        shadowRootOptions?: {
            /** Mode of the shadowRoot.  Allowed values are `open` and `closed`.  When `closed` access is denied to `shadowRoot` from the element.  This value is `open` by default. **/
            mode?: 'open' | 'closed';
        };
    }
    interface ComponentConfig extends PresentationalConfig {
        renderer?: any;

        styles?: any;

        /** The initial state for a component */
        initialState?: object;

        /** Function that returns the initial state for a component */
        setInitialState?: Function;

        /** Handlers to run when the action type is dispatched */
        actionHandlers?: {
            /** The action handler as an effect function or config object */
            [key: string]:
                | Function
                | {
                      /** The effect function that will be executed as a result of the action being handled. */
                      effect: Function;

                      /** Optional arguments that will be passed into the effect function before coeffects */
                      args?: Array<any>;

                      /** Optional array of interceptors that will be executed before or after the effect. */
                      interceptors?: Array<Function | object>;

                      /** Optional object that contains a modifier name and options. */
                      modifier?: object;

                      /** An action can be prevented from propagating further */
                      stopPropagation?: boolean;
                  };
        };

        eventHandlers?: Array<object>;

        /** A function that executes before a component's state is passed to the view */
        transformState?: Function;

        /** Behaviors applied to the custom element */
        behaviors?: Array<object>;
    }

    interface PropertyConfig {
        /** The default value of the property */
        default?: any;

        /** A function that computes the property value */
        computed?: Function;

        /** Reflect property change to corresponding attribute. This value is false by default */
        reflect?: boolean;

        /** Allows other components to select or point to this property value and map it to its own local property */
        selectable?: boolean;

        /** Schema that will validate the passed in value of the property during development. This value is `null` by default. */
        schema?: object;
    }
}
