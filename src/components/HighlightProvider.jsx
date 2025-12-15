import React, { useEffect, useRef, useState } from "react";

export default function HighlightProvider({ children }) {
    const [showToolbar, setShowToolbar] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const rootRef = useRef(null);

    useEffect(() => {
        const handleMouseUp = () => {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) {
                setShowToolbar(false);
                return;
            }

            const range = selection.getRangeAt(0);
            if (range.collapsed) {
                setShowToolbar(false);
                return;
            }

            if (!rootRef.current.contains(range.commonAncestorContainer)) {
                setShowToolbar(false);
                return;
            }

            const rect = range.getBoundingClientRect();
            setPosition({
                top: rect.top + window.scrollY - 40,
                left: rect.left + window.scrollX
            });

            setShowToolbar(true);
        };

        const handleMouseDown = () => {
            setShowToolbar(false);
        };

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    const highlightSelection = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return;

        const mark = document.createElement("mark");
        mark.dataset.highlight = "true";
        mark.style.backgroundColor = "#fde68a";

        try {
            const contents = range.cloneContents(); // 1️⃣ clone FIRST
            range.deleteContents();                 // 2️⃣ then delete
            mark.appendChild(contents);             // 3️⃣ wrap
            range.insertNode(mark);                 // 4️⃣ insert

            selection.removeAllRanges();
            setShowToolbar(false);
        } catch (e) {
            console.error("Highlight error:", e);
        }
    };



    const clearHighlight = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return;

        const startNode = range.startContainer;
        const endNode = range.endContainer;

        if (
            startNode.nodeType !== Node.TEXT_NODE ||
            endNode.nodeType !== Node.TEXT_NODE
        ) return;

        const startMark = startNode.parentElement.closest("mark[data-highlight]");
        const endMark = endNode.parentElement.closest("mark[data-highlight]");

        if (!startMark || startMark !== endMark) return;

        const mark = startMark;

        // Split text safely
        const afterEnd = endNode.splitText(range.endOffset);
        const selected = startNode.splitText(range.startOffset);

        // Move selected text out of mark
        mark.parentNode.insertBefore(selected, mark);

        // Clean up empty mark
        if (!mark.textContent) {
            mark.remove();
        }

        selection.removeAllRanges();
        setShowToolbar(false);
    };


    function unwrapMark(mark) {
        const parent = mark.parentNode;
        while (mark.firstChild) {
            parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
    }

    function splitMark(mark, range) {
        const markRange = document.createRange();
        markRange.selectNodeContents(mark);

        const before = markRange.cloneRange();
        before.setEnd(range.startContainer, range.startOffset);

        const after = markRange.cloneRange();
        after.setStart(range.endContainer, range.endOffset);

        const parent = mark.parentNode;

        if (!before.collapsed) {
            const leftMark = mark.cloneNode(false);
            leftMark.appendChild(before.extractContents());
            parent.insertBefore(leftMark, mark);
        }

        if (!after.collapsed) {
            const rightMark = mark.cloneNode(false);
            rightMark.appendChild(after.extractContents());
            parent.insertBefore(rightMark, mark.nextSibling);
        }

        parent.removeChild(mark);
    }



    return (
        <>
            {showToolbar && (
                <div
                    onMouseDown={(e) => e.stopPropagation()}
                    className="absolute z-50 flex gap-2 bg-white border shadow rounded px-2 py-1"
                    style={{top: position.top, left: position.left}}
                >
                    <button
                        onClick={highlightSelection}
                        className="text-sm px-2 py-1 bg-yellow-300 rounded"
                    >
                        Highlight
                    </button>
                    <button
                        onClick={clearHighlight}
                        className="text-sm px-2 py-1 bg-gray-200 rounded"
                    >
                        Clear
                    </button>
                </div>
            )}

            <div ref={rootRef}>
                {children}
            </div>
        </>
    );
}
