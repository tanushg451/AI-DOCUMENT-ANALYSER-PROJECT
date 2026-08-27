import { r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-DWcHyHOy2.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/docs.functions-lWediJZj.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var DOC_SYSTEM_PROMPT = `You are an expert software documentation engineer. Analyze the provided source code carefully and generate accurate, concise and useful technical documentation. Do not invent functionality that does not exist in the code. Clearly distinguish between facts inferred from the code and reasonable suggestions. Adapt the documentation to the requested programming language and documentation format.

Structure the output in Markdown and include the following sections WHEN APPLICABLE (skip a section entirely if it cannot be determined from the code):

## Overview
## Functions / Methods (name, purpose, parameters, return value — use a table when there are several)
## Classes (name, purpose, important properties, important methods)
## Algorithm
## Complexity (time and space — only when reasonably determinable)
## Dependencies
## Usage Example
## Notes
## Potential Improvements

Rules:
- Respond with ONLY the documentation. No greetings, no meta commentary, no "here is your documentation".
- Never wrap the entire response in a single fenced code block.
- Use fenced code blocks (with the correct language tag) only for code snippets.
- If the requested documentation type is "Javadoc", output ready-to-paste Javadoc comment blocks inside fenced code blocks, plus a short overview.
- If the requested documentation type is "Simple Explanation", use plain, beginner-friendly language and fewer sections.
- If the requested documentation type is "API Documentation", focus on endpoints/public interface, inputs, outputs and error cases.`;
function buildDocUserPrompt(input) {
	return `Programming language: ${input.language}
Documentation type: ${input.documentationType}

Source code:
\`\`\`${input.language.toLowerCase()}
${input.sourceCode}
\`\`\``;
}
var GenerateDocsInput = objectType({
	sourceCode: stringType().trim().min(1).max(3e4),
	language: stringType().trim().min(1).max(40),
	documentationType: stringType().trim().min(1).max(60)
});
var generateDocumentation_createServerFn_handler = createServerRpc({
	id: "cf83fb884f9a20eadc84a4d6b0cdfb55e83a440a27a08690eea58b3400fc156a",
	name: "generateDocumentation",
	filename: "src/lib/docs.functions.ts"
}, (opts) => generateDocumentation.__executeServer(opts));
var generateDocumentation = createServerFn({ method: "POST" }).inputValidator((input) => GenerateDocsInput.parse(input)).handler(generateDocumentation_createServerFn_handler, async ({ data }) => {
	const apiKey = processModule.env["OPENROUTER_API_KEY"];
	if (!apiKey) throw new Error("OPENROUTER_API_KEY is missing");
	const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "google/gemini-2.5-flash",
			max_tokens: 4e3,
			messages: [{
				role: "system",
				content: DOC_SYSTEM_PROMPT
			}, {
				role: "user",
				content: buildDocUserPrompt(data)
			}],
			temperature: .2
		})
	});
	if (!response.ok) {
		const errorText = await response.text();
		console.error("OpenRouter error:", errorText);
		throw new Error("AI_REQUEST_FAILED");
	}
	const documentation = (await response.json()).choices?.[0]?.message?.content?.trim();
	if (!documentation) throw new Error("EMPTY_RESPONSE");
	return { documentation };
});
//#endregion
export { generateDocumentation_createServerFn_handler };
