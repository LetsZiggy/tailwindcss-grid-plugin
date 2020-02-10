/* ******************************************************************************************** */
/*                                                                                              */
/* This project is inspired by tailwindcss-grid (https://github.com/chrisrowe/tailwindcss-grid) */
/*                                                                                              */
/* ******************************************************************************************** */

/**
 * @module tailwindcss-grid
 * @description Generate css grid classes
 *
 *
 *
 * @param {Object} [options]
 *
 * @param {Number[]} [options.gridRows=[1,2,3,4,5,6,7,8,9,10,11,12]] - Only (gridRows.value > 0) will be used
 *   Used to generate "grid-template-rows", and "grid-auto-rows"
 *   Used to generate "grid-row-start", and "grid-row-end"
 *   "grid-auto-rows" formula: `calc(100% / ${ gridRows.value })`
 *   Largest "grid-row-start" will be generated using the largest `${ gridRows.value * rowMultiples }`
 *   Largest "grid-row-end" will be generated using the largest `${ gridRows.value * rowMultiples + 1 }`
 *
 * @param {Number[]} [options.gridCols=[1,2,3,4,5,6,7,8,9,10,11,12]] - Only (gridCols.value > 0) will be used
 *   Used to generate "grid-template-columns", and "grid-auto-columns"
 *   Used to generate "grid-column-start", and "grid-column-end"
 *   "grid-auto-columns" formula: `calc(100% / ${ gridCols.value })`
 *   Largest "grid-column-start" will be generated using the largest `${ gridCols.value * colMultiples }`
 *   Largest "grid-column-end" will be generated using the largest `${ gridCols.value * colMultiples + 1 }`
 *
 * @param {Number} [options.rowMultiples=5] - Multiplier to determine largest "grid-row-start", and "grid-row-end"
 *
 * @param {Number} [options.colMultiples=1] - Multiplier to determine largest "grid-column-start", and "grid-column-end"
 *
 * @param {Number[]} [options.gaps=[1,2,3,4,5,6,7,8]] - Only (values > 0) will be used
 *   Used to generate "gap"
 *   Used to generate "row-gap", and "column-gap"
 *   Values provided will be used to generate gaps in "px" unit
 *   Values with "rem" units will also be generated based on theme("spacing")
 *
 *
 *
 * @return {Object} Returns Tailwindcss plugin
 */
module.exports = function ({ gridRows = [], gridCols = [], rowMultiples = 5, colMultiples = 1, gaps = []} = {}) {
  if (!Array.isArray(gridRows) || !gridRows.length) {
    gridRows = Array.from({
      length: 12,
    }, (_, i) => i + 1)
  }
  else if (gridRows.length > 1) {
    gridRows = gridRows.reduce((acc, value) => {
      if (Number.isInteger(value)) {
        acc.push(value)
      }

      return acc
    }, [])

    gridRows.sort((a, b) => a - b)
  }

  if (!Array.isArray(gridCols) || !gridCols.length) {
    gridCols = Array.from({
      length: 12,
    }, (_, i) => i + 1)
  }
  else if (gridCols.length > 1) {
    gridCols = gridCols.reduce((acc, value) => {
      if (Number.isInteger(value)) {
        acc.push(value)
      }

      return acc
    }, [])

    gridCols.sort((a, b) => a - b)
  }

  if (!Number.isInteger(rowMultiples)) {
    rowMultiples = 5
  }

  if (!Number.isInteger(colMultiples)) {
    colMultiples = 1
  }

  if (!Array.isArray(gaps) || !gaps.length) {
    gaps = Array.from({
      length: 8,
    }, (_, i) => i + 1)
  }
  else if (gaps.length > 1) {
    gaps = gaps.reduce((acc, value) => {
      if (Number.isInteger(value)) {
        acc.push(value)
      }

      return acc
    }, [])

    gaps.sort((a, b) => a - b)
  }

  return function ({ addUtilities, e, theme }) {
    const grid = {
      ".grid": {
        display: "grid",
      },
      ".inline-grid": {
        display: "inline-grid",
      },
    }

    const templateRowsCols = (() => {
      const templateRows = {
        ".grid-rows-none": {
          "grid-template-rows": "none",
        },
      }

      const templateCols = {
        ".grid-cols-none": {
          "grid-template-columns": "none",
        },
      }

      for (const value of gridRows) {
        templateRows[`.${ e(`grid-rows-${ value }`) }`] = {
          "grid-template-rows": `[start] repeat(${ value }, minmax(0, 1fr)) [end]`,
        }
      }

      for (const value of gridCols) {
        templateCols[`.${ e(`grid-cols-${ value }`) }`] = {
          "grid-template-columns": `[start] repeat(${ value }, minmax(0, 1fr)) [end]`,
        }
      }

      return { ...templateRows, ...templateCols }
    })()

    const gapRowCol = (() => {
      const gap = {}
      const rowGap = {}
      const colGap = {}

      for (const value of gaps) {
        gap[`.gap-${ value }px`] = {
          gap: `${ value }px`,
        }

        rowGap[`.row-gap-${ value }px`] = {
          "row-gap": `${ value }px`,
        }

        colGap[`.col-gap-${ value }px`] = {
          "column-gap": `${ value }px`,
        }
      }

      for (const [ key, value ] of Object.entries(theme("spacing"))) {
        gap[`.gap-${ key }`] = {
          gap: `${ value } ${ value }`,
        }

        rowGap[`.row-gap-${ key }`] = {
          "row-gap": value,
        }

        colGap[`.col-gap-${ key }`] = {
          "column-gap": value,
        }
      }

      return { ...gap, ...rowGap, ...colGap }
    })()

    const itemsJustifyAlign = (() => {
      const values = [ "start", "end", "center", "stretch" ]
      const justifyItems = {}
      const alignItems = {}

      for (const value of values) {
        justifyItems[`.grid-justify-items-${ value }`] = {
          "justify-items": value,
        }

        alignItems[`.grid-align-items-${ value }`] = {
          "align-items": value,
        }
      }

      return { ...justifyItems, ...alignItems }
    })()

    const contentJustifyAlign = (() => {
      const values = [ "start", "end", "center", "stretch", "space-around", "space-between", "space-evenly" ]
      const justifyContent = {}
      const alignContent = {}

      for (const value of values) {
        const name = value.includes("-")
          ? value.split("-")[1]
          : value

        justifyContent[`.grid-justify-${ name }`] = {
          "justify-content": value,
        }

        alignContent[`.grid-align-${ name }`] = {
          "align-content": value,
        }
      }

      return { ...justifyContent, ...alignContent }
    })()

    const autoRowsCols = (() => {
      const autoRows = {}
      const autoCols = {}

      for (const value of gridRows) {
        autoRows[`.${ e(`auto-rows-${ value }`) }`] = {
          "grid-auto-rows": `calc(100% / ${ value })`,
        }
      }

      for (const value of gridCols) {
        autoCols[`.${ e(`auto-cols-${ value }`) }`] = {
          "grid-auto-columns": `calc(100% / ${ value })`,
        }
      }

      return { ...autoRows, ...autoCols }
    })()

    const autoFlow = {
      ".grid-flow-row": {
        "grid-auto-flow": "row",
      },
      ".grid-flow-row-dense": {
        "grid-auto-flow": "row dense",
      },
      ".grid-flow-col": {
        "grid-auto-flow": "column",
      },
      ".grid-flow-col-dense": {
        "grid-auto-flow": "column dense",
      },
    }

    const gridStartEnd = (() => {
      const row = {
        ".row-auto": {
          "grid-row": "auto",
        },
      }

      const rowStart = {
        ".row-start-auto": {
          "grid-row-start": "auto",
        },
      }

      const rowEnd = {
        ".row-end-auto": {
          "grid-row-end": "auto",
        },
      }

      const col = {
        ".col-auto": {
          "grid-column": "auto",
        },
      }

      const colStart = {
        ".col-start-auto": {
          "grid-column-start": "auto",
        },
      }

      const colEnd = {
        ".col-end-auto": {
          "grid-column-end": "auto",
        },
      }

      const rowLines = Array.from({
        length: (gridRows[(gridRows.length - 1)] * rowMultiples + 1),
      }, (_, i) => i + 1)

      const colLines = Array.from({
        length: (gridCols[(gridCols.length - 1)] * colMultiples + 1),
      }, (_, i) => i + 1)

      for (const value of rowLines) {
        rowStart[`.row-start-${ value }`] = {
          "grid-row-start": `${ value }`,
        }

        rowEnd[`.row-end-${ (value + 1) }`] = {
          "grid-row-end": `${ (value + 1) }`,
        }
      }

      for (const value of colLines) {
        colStart[`.col-start-${ value }`] = {
          "grid-column-start": `${ value }`,
        }

        colEnd[`.col-end-${ (value + 1) }`] = {
          "grid-column-end": `${ (value + 1) }`,
        }
      }

      return { ...row, ...rowStart, ...rowEnd, ...col, ...colStart, ...colEnd }
    })()

    const selfJustifyAlign = (() => {
      const values = [ "start", "end", "center", "stretch" ]
      const justifyItems = {}
      const alignItems = {}

      for (const value of values) {
        justifyItems[`.grid-justify-self-${ value }`] = {
          "justify-self": value,
        }

        alignItems[`.grid-align-self-${ value }`] = {
          "align-self": value,
        }
      }

      return { ...justifyItems, ...alignItems }
    })()

    addUtilities({
      ...grid,
      ...templateRowsCols,
      ...gapRowCol,
      ...itemsJustifyAlign,
      ...contentJustifyAlign,
      ...autoRowsCols,
      ...autoFlow,
      ...gridStartEnd,
      ...selfJustifyAlign,
    }, [ "responsive" ])
  }
}
