import { Node } from "@/types/node";

export const TAG_REG = /#([^\s#,]+)/;

// extractTagsFromNodes extracts tags from nodes.
export const extractTagsFromNodes = (nodes: Node[]) => {
  const tags = new Set<string>();

  const traverse = (nodes: Node[], handle: (node: Node) => void) => {
    for (const node of nodes) {
      if (!node) {
        continue;
      }

      handle(node);
      if (node.paragraphNode || node.unorderedListNode || node.orderedListNode) {
        const children = ((node.paragraphNode || node.unorderedListNode || node.orderedListNode) as any).children;
        if (Array.isArray(children)) {
          traverse(children, handle);
        }
      }
    }
  };

  traverse(nodes, (node) => {
    if (node.tagNode?.content) {
      tags.add(node.tagNode.content);
    }
  });

  return Array.from(tags);
};
