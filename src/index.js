import React, { Fragment } from "react"
import get from "lodash.get"
import capitalize from "capitalize"
import { humanize } from "./humanize-prop"

//https://github.com/pedronauck/docz/blob/master/packages/docz/src/components/PropsTable.tsx

export const getPropType = (prop, Tooltip) => {
  const propName = prop.flowType ? prop.flowType.name : prop.type.name
  const isEnum = propName.startsWith('"') || propName === "enum"
  const name = capitalize(isEnum ? "enum" : propName)
  const value = prop.type && prop.type.value

  if (!name) return null

  if (
    !Tooltip ||
    (isEnum && typeof value === "string") ||
    (!prop.flowType && !isEnum && !value) ||
    (prop.flowType && !prop.flowType.elements)
  ) {
    return name
  }

  return prop.flowType ? (
    <Tooltip text={humanize(prop.flowType)}>{name}</Tooltip>
  ) : (
    <Tooltip text={humanize(prop.type)}>{name}</Tooltip>
  )
}

const ReactPropsTable = class ReactPropsTable extends React.Component {
  render() {
    const { of: component = {}, components = {}, className } = this.props
    const info =
      component && component.__esModule
        ? get(component, "default.__docgenInfo")
        : component.__docgenInfo
    const props = info && info.props

    const hasDescription = Object.keys(props).some(name => {
      const description = get(props, `${name}.description`)
      return Boolean(description) && Boolean(get(description, "length"))
    })

    const Table = components.table || "table"
    const Thead = components.thead || "thead"
    const Tr = components.tr || "tr"
    const Th = components.th || "th"
    const Tbody = components.tbody || "tbody"
    const Td = components.td || "td"
    const Tooltip = components.tooltip

    return (
      <Fragment>
        <Table className={`${className || ""} PropsTable`}>
          <Thead>
            <Tr>
              <Th className="PropsTable--property">Property</Th>
              <Th className="PropsTable--type">Type</Th>
              <Th className="PropsTable--required">Required</Th>
              <Th className="PropsTable--default">Default</Th>
              {hasDescription && (
                <Th width="40%" className="PropsTable--description">
                  Description
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {props &&
              Object.keys(props).map(name => {
                const prop = props[name]

                if (!prop.flowType && !prop.type) return null
                return (
                  <Tr key={name}>
                    <Td>{name}</Td>
                    <Td>{getPropType(prop, Tooltip)}</Td>
                    <Td>{String(prop.required)}</Td>
                    {!prop.defaultValue ? (
                      <Td>
                        <em>-</em>
                      </Td>
                    ) : (
                      <Td>
                        {prop.defaultValue.value === "''" ? (
                          <em>[Empty String]</em>
                        ) : (
                          prop.defaultValue &&
                          prop.defaultValue.value.replace(/\'/g, "")
                        )}
                      </Td>
                    )}
                    {hasDescription && (
                      <Td>{prop.description && prop.description}</Td>
                    )}
                  </Tr>
                )
              })}
          </Tbody>
        </Table>
      </Fragment>
    )
  }
}

ReactPropsTable.__esModule = true
ReactPropsTable.default = ReactPropsTable
module.exports = ReactPropsTable
