import { useState, useEffect, useRef } from "react";

export function Calculator() {
    // 表示内容
    const [display, setDisplay] = useState('');
    // 表示内容自動スクロール用
    const displayRef = useRef(null);

    // ボタンの配置
    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', 'C', '=', '+'
    ];

    const handleClick = (btn) => {
        if (btn == 'C') {
            // 表示をクリアする
            setDisplay('');
        } else if (btn === '=') {
            // 計算を実行する
            try {
                const result = calculate(display);
                setDisplay(String(result));
            } catch(error) {
                if (error.message === '除算エラー') {
                    alert(error.message);
                } else {
                    alert('無効な式です。再度やり直してください。');
                }
                setDisplay('');
            }
        } else {
            // 数字または演算子を追加
            setDisplay((prev) => prev + btn);
        }
    }

    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollLeft = displayRef.current.scrollWidth;
        }
    }, [display]);

    // 計算処理ロジック
    const calculate = (expression) => {
        // 「整数 演算子 整数」の形式のみ許可
        const validExpression = /^(\d+)([+\-*/])(\d+)$/;

        // 有効な式であるかチェック
        const match = expression.match(validExpression);
        if (!match) {
            throw new Error('無効な式です。');
        }

        const num1 = Number(match[1]); // 2つ目の整数
        const operator = match[2];     // 演算子
        const num2 = Number(match[3]); // 2つ目の整数

        //　計算を実行
        switch (operator) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '*': return num1 * num2;
            case '/': if (num2 === 0) throw new Error('除算エラー'); return num1 / num2;
        }
    }

    // UI構築
    return (
        <div className="calculator">
            <h2>電卓アプリ</h2>

            {/* 表示欄 */}
            <div className="calculator-container" ref={displayRef}>{display}</div>

            {/* ボタン群 */}
            <div className="button-grid">
                {buttons.map((btn) => (
                    <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
                ))}
            </div>
        </div>
    )
}