# @klf/klf-ui-script-loader

This is an invisible component that loads a script into the page. It is useful for loading scripts that need to be run on every page. Global UI Scripts are not loaded on every page, so this is a way to ensure that a script is loaded on every page.

Global UI Scripts are not loaded on pages that are not a list or form. This could include dashboards or other pages that are not a list or form.

The user provides a list of scripts to load. The scripts are loaded in the order they are provided by creating script tags. If the component is configured correctly you should see console logs in the browser for the list of scripts that will be loaded. Filter the console on `KLF UI Script Loader` to see the logs.

If you don't see the logs check the configuration of the component. If the component errors then it will not render.

You can search the DOM for the tag, but it requires to search shadow dom. These two functions can help to search the shadow dom.

```javascript
/**
 * @param {string1} selector Same type of selector that would be passed to document.querySelectorAll
 * @param {<E extends Element = Element>(selectors: string) => NodeListOf<E>} querySelectorAll
 * @param {*} elements
 * @returns {HTMLElement[]} Returns an array of HTMLElements that match the selector
 */
function querySelectorAllIncludingShadowElements(
  selector,
  querySelectorAll = document.querySelectorAll.bind(document),
  elements = []
) {
  const allElements = querySelectorAll("*");

  allElements.forEach((element) => {
    // Check if the element matches the selector and contains the text
    if (element.matches(selector)) {
      elements.push(element);
    }

    // Check within the Shadow DOM if it exists
    if (element.shadowRoot) {
      querySelectorAllIncludingShadowElements(
        selector,
        element.shadowRoot.querySelectorAll.bind(element.shadowRoot),
        elements
      );
    }
  });
  return elements;
}

/**
 * @param {string} selector
 * @returns {HTMLElement | null} Returns the first HTMLElement that matches the selector
 */
function querySelectorIncludingShadowElements(selector) {
  const result = querySelectorAllIncludingShadowElements(selector);
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}
```

Then search for the tag with the following code:

```javascript
querySelectorAllIncludingShadowElements("x-53417-klf-ui-script-loader");
```
