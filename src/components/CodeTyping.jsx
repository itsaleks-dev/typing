import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Terminal = styled.div`
  background: #1e1e1e;
  color: #eee;
  font-family: monospace;
  padding: 20px;
  border-radius: 8px;
  width: fit-content;
  margin: 40px auto;
  font-size: 18px;
  line-height: 1.5;
`;

const Gray = styled.span`
  color: #888;
`;

const Keyword = styled.span`
  color: #c678dd; /* фиолетовый */
`;

const Variable = styled.span`
  color: #61afef; /* голубой */
`;

const String = styled.span`
  color: #98c379; /* зелёный */
`;

const Symbol = styled.span`
  color: #abb2bf; /* светло-серый */
`;

const Cursor = styled.span`
  border-right: 2px solid #00ff9c;
  margin-left: 2px;
  animation: blink 0.8s infinite;
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

function CodeTyping() {
    const words = [
        <>
            <Keyword>const</Keyword> <Variable>role</Variable>{" "}
            <Symbol>=</Symbol> <String>'Developer'</String><Symbol>;</Symbol>
        </>,
        <>
            <Keyword>const</Keyword> <Variable>role</Variable>{" "}
            <Symbol>=</Symbol> <String>'Full Stack Engineer'</String><Symbol>;</Symbol>
        </>,
        <>
            <Keyword>const</Keyword> <Variable>role</Variable>{" "}
            <Symbol>=</Symbol> <String>'UI/UX Designer'</String><Symbol>;</Symbol>
        </>,
        <>
            <Keyword>const</Keyword> <Variable>role</Variable>{" "}
            <Symbol>=</Symbol> <String>'Freelancer'</String><Symbol>;</Symbol>
        </>,
    ];

    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);

    // имитация запуска npm run dev
    useEffect(() => {
        const startDelay = setTimeout(() => setShowTerminal(true), 1500);
        return () => clearTimeout(startDelay);
    }, []);

    useEffect(() => {
        if (!showTerminal) return;

        const currentWord = words[wordIndex].props.children
            .map((el) => (typeof el === "string" ? el : el.props.children))
            .join("");

        let timer;
        if (isDeleting) {
            timer = setTimeout(() => {
                setText(currentWord.substring(0, text.length - 1));
            }, 50);
        } else {
            timer = setTimeout(() => {
                setText(currentWord.substring(0, text.length + 1));
            }, 120);
        }

        if (!isDeleting && text === currentWord) {
            setTimeout(() => setIsDeleting(true), 1000);
        }

        if (isDeleting && text === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex, showTerminal]);

    return (
        <Terminal>
            <div>
                <Gray>$</Gray> npm run dev
            </div>
            <div><Gray>&gt;</Gray> Vite v5.0.0 ready in 500ms</div>
            <div><Gray>&gt;</Gray> Local: http://localhost:5173/</div>
            <div style={{ marginBottom: "10px" }}>
                <Gray>&gt;</Gray> Network: use --host to expose
            </div>

            {showTerminal && (
                <div>
                    {words[wordIndex].props.children.map((el, i) => {
                        if (typeof el === "string") {
                            return <span key={i}>{el.slice(0, text.length)}</span>;
                        }
                        if (typeof el.props.children === "string") {
                            return React.cloneElement(el, { key: i }, el.props.children.slice(0, text.length));
                        }
                        return null;
                    })}
                    <Cursor />
                </div>
            )}
        </Terminal>
    );
}

export default CodeTyping;