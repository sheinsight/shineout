import React from 'react'
import locate from 'doc/locate'
import ReactMarkDown from 'react-markdown'
import { Link } from 'react-router-dom'
import { markdownClass } from 'doc/styles'

const APP = props => {
  const { title, properties, cn, en, subTitle, single, isDetail } = props
  const hasVersion = properties.find(item => !!item.version)

  return (
    <>
      {!single ? (
        <>
          <h3 id={`api-${title}`}>
            <span>{title}</span>
            {subTitle ? <em>{`${`  ${subTitle}`}`}</em> : null}
          </h3>
          {cn ? (
            <p style={{ whiteSpace: 'pre-wrap', margin: '14px 0 14px 0', lineHeight: '2' }}>{locate(cn, en)}</p>
          ) : null}
        </>
      ) : null}
      <div style={{ overflow: 'auto' }}>
        <table className="doc-api-table">
          <thead>
            <tr>
              <th>{locate('属性', 'Property')}</th>
              <th>{locate('类型', 'Type')}</th>
              {isDetail ? null : <th>{locate('默认值', 'Default')}</th>}
              <th>{locate('说明', 'Description')}</th>
              {hasVersion ? <th>{locate('版本', 'Version')}</th> : null}
            </tr>
          </thead>
          <tbody>
            {properties
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ name, tag, type, required } = {}) => {
                const defaultV = required ? locate('必填', 'required') : undefined
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{type}</td>
                    {isDetail ? null : <td>{defaultV || tag.default || '-'}</td>}
                    <td>
                      <ReactMarkDown
                        className={markdownClass('api-desc')}
                        source={locate(tag.cn, tag.en)}
                        renderers={{
                          link: prop => {
                            const target = prop.href.indexOf('http') === 0 ? '_blank' : undefined
                            if (target)
                              return (
                                <a href={prop.href} target={target}>
                                  {prop.children}
                                </a>
                              )
                            return (
                              <Link to={prop.href} target={target}>
                                {prop.children}
                              </Link>
                            )
                          },
                        }}
                      />
                    </td>
                    {hasVersion ? <td>{tag.version || '-'}</td> : null}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default APP
