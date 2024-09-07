import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import { Fragment } from "@servicenow/ui-renderer-snabbdom";

/**
 * @param {ScriptLoaderState} state
 * @param {Coeffects} param1
 * @returns {JSX.Element}
 */
const view = ({ properties }, { updateState }) => {
  const { scripts } = properties;

  const logPrefix = "KLF UI Script Loader -";

  console.log(`${logPrefix} loading scripts: `, scripts);

  /** @type {string[]} */
  let scriptsArray = [];

  if (typeof scripts === "string") {
    try {
      scriptsArray = scripts === "" ? [] : JSON.parse(scripts);
    } catch (error) {
      console.error(`${logPrefix} "scripts" field is not a valid JSON array`, scripts);
      return <div>Invalid scripts. Scripts is not a valid JSON array</div>;
    }
  } else {
    scriptsArray = scripts;
  }

  console.log(`${logPrefix} finished parsing scripts array. Rendering script tags`, scripts);

  return (
    <Fragment>
      {scriptsArray.map((script) => (
        <script src={`/${script}.jsdbx`}></script>
      ))}
    </Fragment>
  );
};

createCustomElement("x-53417-klf-ui-script-loader", {
  renderer: { type: snabbdom },
  properties: {
    scripts: {
      default: "[]",
      schema: {
        type: "string",
      },
    },
  },
  view,
});
