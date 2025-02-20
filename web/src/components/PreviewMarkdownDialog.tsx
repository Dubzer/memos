import { IconButton } from "@mui/joy";
import { useEffect, useState } from "react";
import { useMemoParser } from "@/hooks/useMemoParser";
import { Node } from "@/types/node";
import { generateDialog } from "./Dialog";
import Icon from "./Icon";
import MemoContent from "./MemoContent";

interface Props extends DialogProps {
  content: string;
}

const PreviewMarkdownDialog: React.FC<Props> = ({ content, destroy }: Props) => {
  const memoParser = useMemoParser();
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const nodes = await memoParser.parseOrFetchNodes(content);
      if (mounted) setNodes(nodes);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCloseBtnClick = () => {
    destroy();
  };

  return (
    <>
      <div className="dialog-header-container">
        <div className="flex flex-row justify-start items-center">
          <p className="text-black opacity-80 dark:text-gray-200">Preview</p>
        </div>
        <IconButton size="sm" onClick={handleCloseBtnClick}>
          <Icon.X className="w-5 h-auto" />
        </IconButton>
      </div>
      <div className="flex flex-col justify-start items-start max-w-full w-[32rem]">
        {content !== "" ? <MemoContent nodes={nodes} /> : <p className="text-gray-400 dark:text-gray-600">Nothing to preview</p>}
      </div>
    </>
  );
};

export default function showPreviewMarkdownDialog(content: string): void {
  generateDialog(
    {
      className: "preview-markdown-dialog",
      dialogName: "preview-markdown-dialog",
      containerClassName: "dark:!bg-zinc-800",
    },
    PreviewMarkdownDialog,
    {
      content,
    },
  );
}
