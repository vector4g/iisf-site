// mdx-components.tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="mt-8 text-3xl font-serif text-slate-50" {...props} />
    ),
    h2: (props) => (
      <h2 className="mt-8 text-2xl font-serif text-slate-50" {...props} />
    ),
    p: (props) => (
      <p className="mt-4 text-sm leading-relaxed text-slate-200" {...props} />
    ),
    ...components,
  };
}
