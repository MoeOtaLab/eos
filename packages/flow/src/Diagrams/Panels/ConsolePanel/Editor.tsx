import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './Editor.module.css';
import { useUpdateEffect } from 'ahooks';
import './UserWorker';

export function Editor(props: { code: string }) {
  const { code } = props;

  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return monaco.editor.create(monacoEl.current!, {
          value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
            '\n',
          ),
          language: 'typescript',
          readOnly: true,
        });
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  useUpdateEffect(() => {
    async function updateValue() {
      if (editor) {
        editor.setValue(code);
        editor.updateOptions({
          readOnly: false,
        });
        await editor.getAction('editor.action.formatDocument')?.run();
        editor.updateOptions({
          readOnly: true,
        });
      }
    }
    updateValue();
  }, [code]);

  return <div className={styles.editor} ref={monacoEl}></div>;
}
