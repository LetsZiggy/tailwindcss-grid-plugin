# tailwindcss Grid Plugin

This repository is inspired by [@chrisrowe/tailwindcss-grid](https://github.com/chrisrowe/tailwindcss-grid).

<br>

### Installation

##### Prerequisites

- `tailwindcss` is installed ([Link](https://tailwindcss.com/docs/installation/))

##### Installing Plugin

- `npm install --save-dev github:LetsZiggy/tailwindcss-grid-plugin`

---

### Change Log

###### tailwindcss v1.7.0 update

- Classes updated to match `tailwindcss v1.7.0` grid class names.

###### tailwindcss v1.2.0 update

- Plugin options name change
- Classes updated to match `tailwindcss v1.2.0` grid class names.
  - Classes not applied are `.row-span-${ number }` and `.col-span-${ number }`.

---

### Usage

```javascript
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    // Using default options
    require("tailwindcss-grid-plugin")(),

    // Customising options
    require("tailwindcss-grid-plugin")({/* options */}),
  ],
  // ...
}
```

---

### Options

All utilities can be used with the `responsive` variant.

```javascript
/**
 * @param {Object} [options]
 */
require("tailwindcss-grid-plugin")({
  /**
   * @param {?(boolean|number|number[])} [options.gridRows=false] -
   *   `false` will disable `gridRows`
   *   `integers` will be converted to array of same length
   *   `true` or `!Array.isArray(gridRows)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
   *   Used to generate "grid-template-rows", and "grid-auto-rows"
   *   Used to generate "grid-row-start", and "grid-row-end"
   *   "grid-auto-rows" formula: `calc(100% / ${ gridRows.value })`
   *   Largest "grid-row-start" will be generated using the largest `${ gridRows.value * rowMultiples }`
   *   Largest "grid-row-end" will be generated using the largest `${ gridRows.value * rowMultiples } + 1`
   */
  gridRows: false,

  /**
   * @param {?(boolean|number|number[])} [options.gridCols=false] -
   *   `false` will disable `gridCols`
   *   `integers` will be converted to array of same length
   *   `true` or `!Array.isArray(gridCols)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
   *   Used to generate "grid-template-columns", and "grid-auto-columns"
   *   Used to generate "grid-column-start", and "grid-column-end"
   *   "grid-auto-columns" formula: `calc(100% / ${ gridCols.value })`
   *   Largest "grid-column-start" will be generated using the largest `${ gridCols.value * colMultiples }`
   *   Largest "grid-column-end" will be generated using the largest `${ gridCols.value * colMultiples } + 1`
   */
  gridCols: false,

  /**
   * @param {?(boolean|number)} [options.rowMultiples=false] -
   *   If `gridRows` is set, `rowMultiples` defaults to 1 if non-integer entry provided
   *   Multiplier to determine largest "grid-row-start", and "grid-row-end"
   */
  rowMultiples: false,

  /**
   * @param {?(boolean|number)} [options.colMultiples=false] -
   *   If `gridCols` is set, `colMultiples` defaults to 1 if non-integer entry provided
   *   Multiplier to determine largest "grid-column-start", and "grid-column-end"
   */
  colMultiples: false,

  /**
   * @param {?(boolean|number|number[])} [options.gaps=false] -
   *   `false` will disable `gaps`
   *   Integers will be converted to array of same length
   *   `true` or `!Array.isArray(gaps)` will default to [ 1, 2, 3, 4, 5, 6, 7, 8 ]
   *   Used to generate "gap"
   *   Used to generate "row-gap", and "column-gap"
   *   Values provided will be used to generate gaps in "px" unit
   *   Values with "rem" units will also be generated based on theme("spacing")
   */
  gaps: false,
})
```

---

### Classes

[display](#display) | [grid-auto-flow](#grid-auto-flow) | [grid-template-rows](#grid-template-rows) | [grid-template-columns](#grid-template-columns) | [grid-auto-rows](#grid-auto-rows) | [grid-auto-columns](#grid-auto-columns) | [grid-row](#grid-row) | [grid-row-start](#grid-row-start) | [grid-row-end](#grid-row-end) | [grid-column](#grid-column) | [grid-column-start](#grid-column-start) | [grid-column-end](#grid-column-end) | [gap](#gap) | [row-gap](#row-gap) | [column-gap](#column-gap)

---

#### display

| class        | property | value        |
| ------------ | -------- | ------------ |
| .grid        | display: | grid;        |
| .inline-grid | display: | inline-grid; |

---

#### grid-auto-flow

| class                | property        | value         |
| ---------------------| --------------- | ------------- |
| .grid-flow-row       | grid-auto-flow: | row;          |
| .grid-flow-row-dense | grid-auto-flow: | row dense;    |
| .grid-flow-col       | grid-auto-flow: | column;       |
| .grid-flow-col-dense | grid-auto-flow: | column dense; |

---

#### grid-template-rows

###### (Using default values)

| class           | property            | value                                     |
| --------------- | ------------------- | ----------------------------------------- |
| .grid-rows-none | grid-template-rows: | none;                                     |
| .grid-rows-1    | grid-template-rows: | [start] repeat(1, minmax(0, 1fr)); [end]  |
| ...             | ...                 | ...                                       |
| .grid-rows-12   | grid-template-rows: | [start] repeat(12, minmax(0, 1fr)); [end] |

###### Formula:

`.grid-rows-${ gridRows.value }` => `grid-template-rows: [start] repeat(${ gridRows.value }, minmax(0, 1fr)); [end]`

---

#### grid-template-columns

###### (Using default values)

| class           | property               | value                                     |
| --------------- | ---------------------- | ----------------------------------------- |
| .grid-cols-none | grid-template-columns: | none;                                     |
| .grid-cols-1    | grid-template-columns: | [start] repeat(1, minmax(0, 1fr)); [end]  |
| ...             | ...                    | ...                                       |
| .grid-cols-12   | grid-template-columns: | [start] repeat(12, minmax(0, 1fr)); [end] |

###### Formula:

`.grid-cols-${ gridCols.value }` => `grid-template-columns: [start] repeat(${ gridCols.value }, minmax(0, 1fr)); [end]`

---

#### grid-auto-rows

###### (Using default values)

| class         | property        | value            |
| ------------- | --------------- | ---------------- |
| .auto-rows-1  | grid-auto-rows: | calc(100% / 1);  |
| ...           | ...             | ...              |
| .auto-rows-12 | grid-auto-rows: | calc(100% / 12); |

###### Formula:

`.auto-rows-${ gridRows.value }` => `grid-auto-rows: calc(100% / ${ gridRows.value });`

---

#### grid-auto-columns

###### (Using default values)

| class         | property           | value            |
| ------------- | ------------------ | ---------------- |
| .auto-cols-1  | grid-auto-columns: | calc(100% / 1);  |
| ...           | ...                | ...              |
| .auto-cols-12 | grid-auto-columns: | calc(100% / 12); |

###### Formula:

`.auto-cols-${ gridCols.value }` => `grid-auto-columns: calc(100% / ${ gridCols.value });`

---

### grid-row

| class     | property  | value |
| --------- | --------- | ----- |
| .row-auto | grid-row: | auto; |

---

#### grid-row-start

###### (Using default values)

| class           | property        | value |
| --------------- | --------------- | ----- |
| .row-start-auto | grid-row-start: | auto; |
| .row-start-1    | grid-row-start: | 1;    |
| ...             | ...             | ...   |
| .row-start-12   | grid-row-start: | 12;   |

###### Formula:

`.row-start-${ gridRows.value * rowMultiples }` => `grid-row-start: ${ gridRows.value * rowMultiples };`

---

#### grid-row-end

###### (Using default values)

| class         | property      | value |
| ------------- | ------------- | ----- |
| .row-end-auto | grid-row-end: | auto; |
| .row-end-2    | grid-row-end: | 2;    |
| ...           | ...           | ...   |
| .row-end-13   | grid-row-end: | 13;   |

###### Formula:

`.row-end-${ gridRows.value * rowMultiples + 1 }` => `grid-row-end: ${ gridRows.value * rowMultiples + 1 };`

---

### grid-column

| class     | property  | value |
| --------- | --------- | ----- |
| .col-auto | grid-row: | auto; |

---

#### grid-column-start

###### (Using default values)

| class           | property           | value |
| ----------------| ------------------ | ----- |
| .col-start-auto | grid-column-start: | auto; |
| .col-start-1    | grid-column-start: | 1;    |
| ...             | ...                | ...   |
| .col-start-12   | grid-column-start: | 12;   |

###### Formula:

`.col-start-${ gridCols.value * colMultiples }` => `grid-column-start: ${ gridCols.value * colMultiples };`

---

#### grid-column-end

###### (Using default values)

| class         | property         | value |
| ------------- | ---------------- | ----- |
| .col-end-auto | grid-column-end: | auto; |
| .col-end-2    | grid-column-end: | 2;    |
| ...           | ...              | ...   |
| .col-end-13   | grid-column-end: | 13;   |

###### Formula:

`.col-end-${ gridCols.value * colMultiples + 1 }` => `grid-column-end: ${ gridCols.value * colMultiples + 1 };`

---

#### gap

###### (Using default values)

| class    | property | value    |
| -------- | -------- | -------- |
| .gap-1px | gap:     | 1px;     |
| ...      | ...      | ...      |
| .gap-8px | gap:     | 8px;     |
| .gap-0   | gap:     | 0;       |
| .gap-1   | gap:     | 0.25rem; |
| .gap-2   | gap:     | 0.5rem;  |
| .gap-3   | gap:     | 0.75rem; |
| .gap-4   | gap:     | 1rem;    |
| .gap-5   | gap:     | 1.25rem; |
| .gap-6   | gap:     | 1.5rem;  |
| .gap-8   | gap:     | 2rem;    |
| .gap-10  | gap:     | 2.5rem;  |
| .gap-12  | gap:     | 3rem;    |
| .gap-16  | gap:     | 4rem;    |
| .gap-20  | gap:     | 5rem;    |
| .gap-24  | gap:     | 6rem;    |
| .gap-32  | gap:     | 8rem;    |
| .gap-40  | gap:     | 10rem;   |
| .gap-48  | gap:     | 12rem;   |
| .gap-56  | gap:     | 14rem;   |
| .gap-64  | gap:     | 16rem;   |
| .gap-px  | gap:     | 1px;     |

###### Formula:

`.gap-${ gap.value }px` => `gap: ${ gap.value }px ${ gap.value }px;`

---

#### row-gap

###### (Using default values)

| class      | property | value    |
| ---------- | -------- | -------- |
| .gap-y-1px | row-gap: | 1px;     |
| ...        | ...      | ...      |
| .gap-y-8px | row-gap: | 8px;     |
| .gap-y-0   | row-gap: | 0;       |
| .gap-y-1   | row-gap: | 0.25rem; |
| .gap-y-2   | row-gap: | 0.5rem;  |
| .gap-y-3   | row-gap: | 0.75rem; |
| .gap-y-4   | row-gap: | 1rem;    |
| .gap-y-5   | row-gap: | 1.25rem; |
| .gap-y-6   | row-gap: | 1.5rem;  |
| .gap-y-8   | row-gap: | 2rem;    |
| .gap-y-10  | row-gap: | 2.5rem;  |
| .gap-y-12  | row-gap: | 3rem;    |
| .gap-y-16  | row-gap: | 4rem;    |
| .gap-y-20  | row-gap: | 5rem;    |
| .gap-y-24  | row-gap: | 6rem;    |
| .gap-y-32  | row-gap: | 8rem;    |
| .gap-y-40  | row-gap: | 10rem;   |
| .gap-y-48  | row-gap: | 12rem;   |
| .gap-y-56  | row-gap: | 14rem;   |
| .gap-y-64  | row-gap: | 16rem;   |
| .gap-y-px  | row-gap: | 1px;     |

###### Formula:

`.gap-y-${ gapRows.value }px` => `row-gap: ${ gapRows.value }px;`

---

#### column-gap

###### (Using default values)

| class      | property    | value    |
| ---------- | ----------- | -------- |
| .gap-x-1px | column-gap: | 1px;     |
| ...        | ...         | ...      |
| .gap-x-8px | column-gap: | 8px;     |
| .gap-x-0   | column-gap: | 0;       |
| .gap-x-1   | column-gap: | 0.25rem; |
| .gap-x-2   | column-gap: | 0.5rem;  |
| .gap-x-3   | column-gap: | 0.75rem; |
| .gap-x-4   | column-gap: | 1rem;    |
| .gap-x-5   | column-gap: | 1.25rem; |
| .gap-x-6   | column-gap: | 1.5rem;  |
| .gap-x-8   | column-gap: | 2rem;    |
| .gap-x-10  | column-gap: | 2.5rem;  |
| .gap-x-12  | column-gap: | 3rem;    |
| .gap-x-16  | column-gap: | 4rem;    |
| .gap-x-20  | column-gap: | 5rem;    |
| .gap-x-24  | column-gap: | 6rem;    |
| .gap-x-32  | column-gap: | 8rem;    |
| .gap-x-40  | column-gap: | 10rem;   |
| .gap-x-48  | column-gap: | 12rem;   |
| .gap-x-56  | column-gap: | 14rem;   |
| .gap-x-64  | column-gap: | 16rem;   |
| .gap-x-px  | column-gap: | 1px;     |

###### Formula:

`.gap-x-${ gapColumns.value }px` => `column-gap: ${ gapColumns.value }px;`

---

### Credits

Thanks to [@adamwathan](https://twitter.com/adamwathan) for creating [tailwindcss](https://github.com/tailwindcss/tailwindcss).
