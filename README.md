# Electron Quick Start

<img src="previews/Preview Vuetify.gif">

## Features

- Auto load your IPC handler definitions for easy IPC communication
- Auto imports components and others (using unplugin-vue-components & unplugin-auto-import)
- Auto load your IPC handler definitions
- Various UI libary options ready to use, or completely plain
- Knex JS for Query builder
- Pinia for global state management
- Vue router preconfigured
- Winston for logging, with daily rotate
- electron-unhandled for catching unhandled errors
- Typescript

## How to use

You can choose the UI library (or completely plain) by choosing from the branches, currently available options are:

- Vanilla (Not using any UI library)
- Vuestic UI
- Vuetify 3 (has dark mode support)

## Architecture

```ts
/**
    .
    ├── backend     // Electron source code goes here
    │   ├── ipc_handlers    // IPC handler definitions that will be auto loaded
    │   ├── main    // Electron main entry
    │   ├── preload     // Electron preload
    │   ├── repositories    // Storing repository file for database usage
    │   ├── services    // Storing services, e.g. logging
    │   ├── @types  // Type definitions
    │   └── utils   // Utility functions

    ├── frontend    // Source code for Vue JS
    │   ├── assets
    │   ├── components
    │   ├── router
    │   ├── store
    │   ├── @types
    │   ├── utils
    │   └── views // Vue router views
    ├── public
    └── tests // Test files
 */
```

## How the define the IPC handlers

The defined ipc handlers will be auto loaded from directory `backend/ipc_handlers`, so you don't need to put all of the ipc handlers in the electron main file.

Example usage:

```ts
const handlers: IPCHandler[] = [
  {
    // The channel name to be called from renderer process
    channelName: "/test",

    // The action for this channel name
    action: (_event, _args) => {
      try {
        return "Hello from main process";
      } catch (error: any) {
        throw error;
      }
    },
  },
  // other definitions
];

export default handlers;
```

Then, you can call the handler from renderer process like this:
```ts
// For example in your vue script tag, no need to import the `backendCall` function
// Its already auto imported :)
backendCall("/test");
```
