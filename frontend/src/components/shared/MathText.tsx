'use client';

import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathTextProps {
  text: string;
  className?: string;
}

export function MathText({ text, className }: MathTextProps) {
  const html = useMemo(() => {
    return text.replace(
      /\$\$([\s\S]*?)\$\$|\$([\s\S]*?)\$/g,
      (_, block, inline) => {
        const tex = block ?? inline;
        const displayMode = block !== undefined;
        try {
          return katex.renderToString(tex, {
            displayMode,
            throwOnError: false,
            trust: true,
          });
        } catch {
          return tex;
        }
      },
    );
  }, [text]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
