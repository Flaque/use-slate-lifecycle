# use-slate-lifecycle [![License](https://img.shields.io/npm/l/use-slate-lifecycle.svg)](https://github.com/flaque/use-slate-lifecycle/blob/master/package.json)

Add `onUserStartsTyping` and `onUserStopsTyping` events to your slate editor.

## Install

```
yarn add @flaque/use-slate-lifecycle
```

## Usage

`use-slate-lifecycle` works by returning a function that needs to be called
in your `onChange` function like this:

```jsx
const [withLifeCycle] = useSlateLifecycle({
  onUserStartsTyping: () => {},
  onUserStopsTyping: () => {}
});

// ...

<Editor onChange={(change) => {
    withLifeCycle(change)
    // .. other stuff
}}>

```

Full example:

```jsx
import { Editor } from "slate-react";
import useSlateLifecycle from "@flaque/use-slate-lifecycle";

function MyEditor = () => {
  function onUserStartsTyping(change) {
      console.log("starts typing")
  }

  function onUserStopsTyping(change) {
      console.log("stops typing")
  }

  const [withLifeCycle] = useSlateLifecycle({
    onUserStartsTyping,
    onUserStopsTyping
  });

  function onChange(change) {
      withLifeCycle(change)

      // Do your regular updating
  }

  return (
      <Editor onChange={change} {/* ... */} />
  )
}
```
