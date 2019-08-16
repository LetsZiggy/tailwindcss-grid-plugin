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

###### 2020-02-12

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
   * @param {Number[]} [options.gridRows=[1,2,3,4,5,6,7,8,9,10,11,12]] - Only (gridRows.value > 0) will be used
   *   Used to generate "grid-template-rows", and "grid-auto-rows"
   *   Used to generate "grid-row-start", and "grid-row-end"
   *   "grid-auto-rows" formula: `calc(100% / ${ gridRows.value })`
   *   Largest "grid-row-start" will be generated using the largest `${ gridRows.value * rowMultiples }`
   *   Largest "grid-row-end" will be generated using the largest `${ gridRows.value * rowMultiples } + 1`
   */
  gridRows: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],

  /**
   * @param {Number[]} [options.gridCols=[1,2,3,4,5,6,7,8,9,10,11,12]] - Only (gridCols.value > 0) will be used
   *   Used to generate "grid-template-columns", and "grid-auto-columns"
   *   Used to generate "grid-column-start", and "grid-column-end"
   *   "grid-auto-columns" formula: `calc(100% / ${ gridCols.value })`
   *   Largest "grid-column-start" will be generated using the largest `${ gridCols.value * colMultiples }`
   *   Largest "grid-column-end" will be generated using the largest `${ gridCols.value * colMultiples } + 1`
   */
  gridCols: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],

  /**
   * @param {Number} [options.rowMultiples=5] - Multiplier to determine largest "grid-row-start", and "grid-row-end"
   */
  rowMultiples: 5,

  /**
   * @param {Number} [options.colMultiples=1] - Multiplier to determine largest "grid-column-start", and "grid-column-end"
   */
  colMultiples: 1,

  /**
   * @param {Number[]} [options.gaps=[1,2,3,4,5,6,7,8]] - Only (values > 0) will be used
   *   Used to generate "gap"
   *   Used to generate "row-gap", and "column-gap"
   *   Values provided will be used to generate gaps in "px" unit
   *   Values with "rem" units will also be generated based on theme("spacing")
   */
  gaps: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
})
```

---

### Classes

[display](#display) | [grid-template-rows](#grid-template-rows) | [grid-template-columns](#grid-template-columns) | [gap](#gap) | [row-gap](#row-gap) | [column-gap](#column-gap) | [justify-items](#justify-items) | [align-items](#align-items) | [justify-content](#justify-content) | [align-content](#align-content) | [grid-auto-rows](#grid-auto-rows) | [grid-auto-columns](#grid-auto-columns) | [grid-auto-flow](#grid-auto-flow) | [grid-row](#grid-row) | [grid-row-start](#grid-row-start) | [grid-row-end](#grid-row-end) | [grid-column](#grid-column) | [grid-column-start](#grid-column-start) | [grid-column-end](#grid-column-end) | [justify-self](#justify-self) | [align-self](#align-self)

---

#### display

| class        | property | value        |
| ------------ | -------- | ------------ |
| .grid        | display: | grid;        |
| .inline-grid | display: | inline-grid; |

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

| class        | property | value    |
| ------------ | -------- | -------- |
| .row-gap-1px | row-gap: | 1px;     |
| ...          | ...      | ...      |
| .row-gap-8px | row-gap: | 8px;     |
| .row-gap-0   | row-gap: | 0;       |
| .row-gap-1   | row-gap: | 0.25rem; |
| .row-gap-2   | row-gap: | 0.5rem;  |
| .row-gap-3   | row-gap: | 0.75rem; |
| .row-gap-4   | row-gap: | 1rem;    |
| .row-gap-5   | row-gap: | 1.25rem; |
| .row-gap-6   | row-gap: | 1.5rem;  |
| .row-gap-8   | row-gap: | 2rem;    |
| .row-gap-10  | row-gap: | 2.5rem;  |
| .row-gap-12  | row-gap: | 3rem;    |
| .row-gap-16  | row-gap: | 4rem;    |
| .row-gap-20  | row-gap: | 5rem;    |
| .row-gap-24  | row-gap: | 6rem;    |
| .row-gap-32  | row-gap: | 8rem;    |
| .row-gap-40  | row-gap: | 10rem;   |
| .row-gap-48  | row-gap: | 12rem;   |
| .row-gap-56  | row-gap: | 14rem;   |
| .row-gap-64  | row-gap: | 16rem;   |
| .row-gap-px  | row-gap: | 1px;     |

###### Formula:

`.row-gap-${ gapRows.value }px` => `row-gap: ${ gapRows.value }px;`

---

#### column-gap

###### (Using default values)

| class        | property    | value    |
| ------------ | ----------- | -------- |
| .col-gap-1px | column-gap: | 1px;     |
| ...          | ...         | ...      |
| .col-gap-8px | column-gap: | 8px;     |
| .col-gap-0   | column-gap: | 0;       |
| .col-gap-1   | column-gap: | 0.25rem; |
| .col-gap-2   | column-gap: | 0.5rem;  |
| .col-gap-3   | column-gap: | 0.75rem; |
| .col-gap-4   | column-gap: | 1rem;    |
| .col-gap-5   | column-gap: | 1.25rem; |
| .col-gap-6   | column-gap: | 1.5rem;  |
| .col-gap-8   | column-gap: | 2rem;    |
| .col-gap-10  | column-gap: | 2.5rem;  |
| .col-gap-12  | column-gap: | 3rem;    |
| .col-gap-16  | column-gap: | 4rem;    |
| .col-gap-20  | column-gap: | 5rem;    |
| .col-gap-24  | column-gap: | 6rem;    |
| .col-gap-32  | column-gap: | 8rem;    |
| .col-gap-40  | column-gap: | 10rem;   |
| .col-gap-48  | column-gap: | 12rem;   |
| .col-gap-56  | column-gap: | 14rem;   |
| .col-gap-64  | column-gap: | 16rem;   |
| .col-gap-px  | column-gap: | 1px;     |

###### Formula:

`.col-gap-${ gapColumns.value }px` => `column-gap: ${ gapColumns.value }px;`

---

#### justify-items

| class                       | property       | value    |
| --------------------------- | -------------- | -------- |
| .grid-justify-items-start   | justify-items: | start;   |
| .grid-justify-items-end     | justify-items: | end;     |
| .grid-justify-items-center  | justify-items: | center;  |
| .grid-justify-items-stretch | justify-items: | stretch; |

---

#### align-items

| class                     | property     | value    |
| ------------------------- | ------------ | -------- |
| .grid-align-items-start   | align-items: | start;   |
| .grid-align-items-end     | align-items: | end;     |
| .grid-align-items-center  | align-items: | center;  |
| .grid-align-items-stretch | align-items: | stretch; |

---

#### justify-content

| class                         | property         | value          |
| ----------------------------- | ---------------- | -------------- |
| .grid-justify-content-start   | justify-content: | start;         |
| .grid-justify-content-end     | justify-content: | end;           |
| .grid-justify-content-center  | justify-content: | center;        |
| .grid-justify-content-stretch | justify-content: | stretch;       |
| .grid-justify-content-around  | justify-content: | space-around;  |
| .grid-justify-content-between | justify-content: | space-between; |
| .grid-justify-content-evenly  | justify-content: | space-evenly;  |

---

#### align-content

| class                       | property       | value          |
| --------------------------- | -------------- | -------------- |
| .grid-align-content-start   | align-content: | start;         |
| .grid-align-content-end     | align-content: | end;           |
| .grid-align-content-center  | align-content: | center;        |
| .grid-align-content-stretch | align-content: | stretch;       |
| .grid-align-content-around  | align-content: | space-around;  |
| .grid-align-content-between | align-content: | space-between; |
| .grid-align-content-evenly  | align-content: | space-evenly;  |

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

#### grid-auto-flow

| class                | property        | value         |
| ---------------------| --------------- | ------------- |
| .grid-flow-row       | grid-auto-flow: | row;          |
| .grid-flow-row-dense | grid-auto-flow: | row dense;    |
| .grid-flow-col       | grid-auto-flow: | column;       |
| .grid-flow-col-dense | grid-auto-flow: | column dense; |

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
| .row-start-60   | grid-row-start: | 60;   |

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
| .row-end-61   | grid-row-end: | 61;   |

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

#### justify-self

| class                      | property      | value    |
| -------------------------- | ------------- | -------- |
| .grid-justify-self-start   | justify-self: | start;   |
| .grid-justify-self-end     | justify-self: | end;     |
| .grid-justify-self-center  | justify-self: | center;  |
| .grid-justify-self-stretch | justify-self: | stretch; |

---

#### align-self

| class                    | property    | value    |
| ------------------------ | ----------- | -------- |
| .grid-align-self-start   | align-self: | start;   |
| .grid-align-self-end     | align-self: | end;     |
| .grid-align-self-center  | align-self: | center;  |
| .grid-align-self-stretch | align-self: | stretch; |

---

### Credits

Thanks to [@adamwathan](https://twitter.com/adamwathan) for creating [tailwindcss](https://github.com/tailwindcss/tailwindcss).
