import assert from "node:assert/strict";
import { after, afterEach, before, test } from "node:test";
import { createElement } from "react";
import { JSDOM } from "jsdom";
import { createServer } from "vite";

let App;
let act;
let createRoot;
let dom;
let root;
let container;

before(async () => {
  dom = new JSDOM("<!doctype html><html><body></body></html>");
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  ({ act } = await import("react-dom/test-utils"));
  ({ createRoot } = await import("react-dom/client"));

  // Use the project's JSX transform without starting an HTTP server.
  const server = await createServer({
    server: { middlewareMode: true, watch: null, hmr: false, ws: false },
    appType: "custom",
  });
  try {
    ({ default: App } = await server.ssrLoadModule("/src/App.jsx"));
  } finally {
    await server.close();
  }
});

afterEach(() => {
  if (root) act(() => root.unmount());
  root = undefined;
  container?.remove();
});

after(() => {
  dom?.window.close();
  delete globalThis.window;
  delete globalThis.document;
  delete globalThis.IS_REACT_ACT_ENVIRONMENT;
});

function render(tasks) {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  act(() => root.render(createElement(App, { tasks })));
}

function button(name) {
  const element = [...container.querySelectorAll("button")].find(
    (element) => element.textContent.replace(/\s+/g, " ").trim().toLowerCase() === name.toLowerCase(),
  );
  assert.ok(element, `Button exists: ${name}`);
  return element;
}

function click(element) {
  act(() => element.click());
}

function names() {
  return [...container.querySelectorAll(".todo-label")].map(
    (element) => element.textContent,
  );
}

const active = { id: "active-1", name: "Keep first", completed: false };
const anotherActive = { id: "active-2", name: "Keep second", completed: false };
const completed = { id: "done-1", name: "Remove first", completed: true };
const anotherCompleted = { id: "done-2", name: "Remove second", completed: true };

const scenarios = [
  { name: "mixed tasks", tasks: [completed, active, anotherCompleted, anotherActive] },
  { name: "all completed", tasks: [completed, anotherCompleted] },
  { name: "none completed", tasks: [active, anotherActive] },
  { name: "empty list", tasks: [] },
];

for (const view of ["All", "Active", "Completed"]) {
  for (const scenario of scenarios) {
    test(`${scenario.name}: clear and disabled state in ${view} view`, () => {
      // Freezing fixtures also catches accidental mutation of the input tasks.
      const tasks = Object.freeze(scenario.tasks.map((task) => Object.freeze({ ...task })));
      render(tasks);
      click(button(`Show ${view} Tasks`));

      const clear = button("清除已完成任务");
      assert.equal(clear.type, "button");
      assert.equal(clear.disabled, !tasks.some((task) => task.completed));
      click(clear);

      const expected = tasks.filter((task) => !task.completed).map((task) => task.name);
      assert.deepEqual(names(), view === "Completed" ? [] : expected);
      assert.equal(button(`Show ${view} Tasks`).getAttribute("aria-pressed"), "true");
      assert.equal(clear.disabled, true);

      // Return to All to prove hidden completed tasks were removed too.
      click(button("Show All Tasks"));
      assert.deepEqual(names(), expected);
      assert.equal(container.querySelector("#list-heading").textContent,
        `${expected.length} ${expected.length === 1 ? "task" : "tasks"} remaining`);
      assert.ok([...container.querySelectorAll('input[type="checkbox"]')].every(
        (checkbox) => !checkbox.checked,
      ));
      click(clear);
      assert.deepEqual(names(), expected);
    });
  }
}

test("button follows completion changes, including changes hidden by filtering", () => {
  render([active]);
  const clear = button("清除已完成任务");
  assert.equal(clear.disabled, true);
  click(container.querySelector('input[type="checkbox"]'));
  assert.equal(clear.disabled, false);
  click(container.querySelector('input[type="checkbox"]'));
  assert.equal(clear.disabled, true);
  click(container.querySelector('input[type="checkbox"]'));
  click(button("Show Active Tasks"));
  assert.deepEqual(names(), []);
  assert.equal(clear.disabled, false);
  click(clear);
  assert.equal(clear.disabled, true);
  assert.equal(document.activeElement, container.querySelector("#list-heading"));
  click(button("Show All Tasks"));
  assert.deepEqual(names(), []);
});

function changeInput(input, value) {
  act(() => {
    const setter = Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype, "value").set;
    setter.call(input, value);
    input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  });
}

test("add, edit, toggle and individual delete still work after clearing", () => {
  render([active, completed]);
  click(button("清除已完成任务"));
  assert.equal(document.activeElement, container.querySelector("#list-heading"));

  changeInput(container.querySelector("#new-todo-input"), "New task");
  click(button("Add"));
  assert.deepEqual(names(), [active.name, "New task"]);

  click(button("Edit New task"));
  changeInput(container.querySelector(".todo-text"), "Renamed task");
  click(container.querySelector(".todo-edit"));
  assert.deepEqual(names(), [active.name, "Renamed task"]);

  click(container.querySelectorAll('input[type="checkbox"]')[1]);
  assert.equal(button("清除已完成任务").disabled, false);
  click(button("Show Completed Tasks"));
  assert.deepEqual(names(), ["Renamed task"]);
  click(button("Delete Renamed task"));
  assert.equal(button("清除已完成任务").disabled, true);
  click(button("Show All Tasks"));
  assert.deepEqual(names(), [active.name]);
});
