import React, { useState } from 'react';
import classnames from 'classnames';
import { Handle, HandleProps, Position } from 'react-flow-renderer';
import { NodePort } from '../../Operators/Operator';
import css from './OperatorNode.module.less';

export type PortListProps = {
  value?: NodePort[];
  type: HandleProps['type'];
  nestLevel?: number;
};

export const PortList: React.FC<PortListProps> = (props) => {
  const { value = [], type, nestLevel = 0 } = props;
  const [hideChildrenIds, setHideChildren] = useState<string[]>([]);

  function checkIsHideChildren(id: string) {
    return !hideChildrenIds?.includes(id);
  }

  function handleToggleHideChildren(id: string) {
    return () => {
      setHideChildren((hideIds) => {
        const hideIdsWillUpdate = [...hideIds];
        if (hideIdsWillUpdate?.includes(id)) {
          hideIdsWillUpdate.splice(hideIdsWillUpdate.indexOf(id));
        } else {
          hideIdsWillUpdate.push(id);
        }
        return hideIdsWillUpdate;
      });
    };
  }

  return (
    <ul
      className={classnames(css['node__port-list'], css[type], {
        [css['is-sub-list']]: nestLevel,
      })}
      style={{ '--nest-level': nestLevel } as any}
    >
      {value.map((port, index) => {
        const hasChildren = Boolean(port?.children?.length);
        const hideChildren = checkIsHideChildren(port.id);

        return (
          <React.Fragment key={port.id}>
            <li
              className={classnames({
                [css['node__port-expand']]: hasChildren,
                [css['is-last']]: index === value.length - 1,
              })}
            >
              {Boolean(nestLevel) && !hasChildren && (
                <div className={css['node__port-dot']} />
              )}
              {hasChildren && (
                <>
                  {/* TODO: 处理收起时候，链接内容的修改 */}
                  <div
                    className={classnames(css['node__port-expand-trigger'], {
                      [css['is-children-hidden']]: hideChildren,
                    })}
                    onClick={handleToggleHideChildren(port.id)}
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      focusable="false"
                      data-icon="caret-down"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                    </svg>
                  </div>
                  {!hideChildren && (
                    <div className={css['node__port-expand-line']} />
                  )}
                </>
              )}
              <div className={css['node__port-label']}>{port.label}</div>
              <Handle
                type={type}
                position={type === 'source' ? Position.Right : Position.Left}
                id={port.id}
                isConnectable={port.isConnectable ?? true}
              />
            </li>
            {!hideChildren && hasChildren && (
              <li className={css['node__port-children']}>
                <PortList
                  value={port.children}
                  nestLevel={nestLevel + 1}
                  type={type}
                />
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};
