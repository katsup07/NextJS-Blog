---
title: React
excerpt: React makes it easy to create interactive UIs.
image: react-js.svg
isFeatured: false
date: '2016-01-30'
---

Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes...

...Build encapsulated components that manage their own state, then compose them to make complex UIs.

```js
// component interface          
const CapitalizedParagraph = ({propsText}) => {

  // data
  const defaultText = `Oops! Did you forget some text content for this paragraph?!`;

 // behavior
  const makeIntoCapitalizedParagraph = (text) => {
    return <p>{text.toUpperCase()}</p>;
  }

  // view
  return makeIntoCapitalizedParagraph(propsText || defaultText);
}

export default CapitalizedParagraph;
```

Learn more about it [here](https://reactjs.org/).
