import { I as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as Cloud, a as Sparkles, c as Paintbrush, h as FileTypeCorner, j as Atom } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-B9WO1FIF.js
var import_jsx_runtime = require_jsx_runtime();
var tech = [
	{
		name: "React",
		icon: Atom,
		desc: "Component-driven UI"
	},
	{
		name: "TypeScript",
		icon: FileTypeCorner,
		desc: "End-to-end type safety"
	},
	{
		name: "Tailwind CSS",
		icon: Paintbrush,
		desc: "Design-token styling"
	},
	{
		name: "AI / Generative AI",
		icon: Sparkles,
		desc: "Server-side code analysis"
	},
	{
		name: "Supabase",
		icon: Cloud,
		desc: "Database & history storage"
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[900px] px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "About DocuAI"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground",
				children: "DocuAI is an AI-powered developer tool that transforms source code into clear and structured technical documentation. It helps developers understand, document and communicate their code more efficiently."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 text-sm font-semibold tracking-tight",
				children: "Built with"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: tech.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel flex items-start gap-3 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: t.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t.desc
					})] })]
				}, t.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 text-sm font-semibold tracking-tight",
				children: "How it works"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-3 space-y-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. Paste your source code and pick a language and documentation format." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. The request is sent to a secure server function — API keys never reach the browser." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. The AI analyses the code and returns structured Markdown documentation." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "4. Copy, download, regenerate, or revisit it later from History." })
				]
			})
		]
	});
}
//#endregion
export { AboutPage as component };
