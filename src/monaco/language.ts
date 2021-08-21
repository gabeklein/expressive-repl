import { languages } from 'monaco-editor';

languages.registerCompletionItemProvider('javascript', {
  triggerCharacters: ['>'],
  provideCompletionItems: (model, position) => {
    const { lineNumber, column } = position;

    const codePre = model.getValueInRange({
      startLineNumber: lineNumber,
      endLineNumber: lineNumber,
      startColumn: 1,
      endColumn: column,
    });

    const match = codePre.match(/.*<(\w+)>$/);
    const tag = match && match[1];

    if(!tag)
      return;

    const { startColumn, endColumn } = model.getWordUntilPosition(position);
    const { InsertAsSnippet } = languages.CompletionItemInsertTextRule;
    const { EnumMember } = languages.CompletionItemKind;

    const closingTagSuggestion = {
      label: `</${tag}>`,
      kind: EnumMember,
      insertText: `$0</${tag}>`,
      insertTextRules: InsertAsSnippet,
      range:  {
          startLineNumber: lineNumber,
          endLineNumber: lineNumber,
          startColumn: startColumn,
          endColumn: endColumn,
      },
    };

    return {
      suggestions: [
        closingTagSuggestion
      ]
    };
  }
});

// languages.setLanguageConfiguration('javascript', {
//   onEnterRules: [
//     {
//       afterText: />/,
//       beforeText: /</,
//       action: {
//         indentAction: 1
//       }
//     }
//   ]
// })
