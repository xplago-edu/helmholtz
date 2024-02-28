import './App.css'
import {useState} from "react";
import {Heading, Plot} from "react-plot";
import {Axis, Legend, LineSeries} from "react-plot";

type Point = {
    x: number;
    y: number;
}

function App() {
    const [radius, setRadius] = useState("10");
    const [count, setCount] = useState("100");
    const [current, setCurrent] = useState("1");
    const [xStartState, setXStart] = useState("-100");
    const [xEndState, setXEnd] = useState("100");

    const mu0 = 1.257e-6;

    const bFun = (x: number, r: number, n: number, i: number) => {
        return (
            (mu0 * n * i) / (r * 2) *
            ((Math.pow((1 + (Math.pow(x / r - 0.5, 2))), -3/2)) + (Math.pow((1 + (Math.pow(x / r + 0.5, 2))), -3/2)))
        );
    }

    const bForXFun = (xStart: number, xEnd: number, step: number, r: number, n: number, i: number) => {
        const x: number[] = [];
        for (let i = xStart; i <= xEnd; i += step) x.push(i);

        const b = x.map(x => bFun(x, r, n, i));

        const plotData: Point[] = [];
        for (let i = 0; i <= x.length - 1; i++) {
            plotData.push({x: x[i], y: b[i]})
        }

        return plotData;
    }

    const plot = () => {
        const r = Number.parseFloat(radius);
        const n = Number.parseFloat(count);
        const i = Number.parseFloat(current);
        const xStart = Number.parseFloat(xStartState);
        const xEnd = Number.parseFloat(xEndState);

        return bForXFun(xStart, xEnd, 0.5, r, n, i);
    }

    return (
        <div className={"wrapper"}>
            <div className={"inputWrapper"}>
                <div>
                    <label>R (м)</label>
                    <input
                        placeholder={"Radius"}
                        value={radius}
                        onChange={(event) => setRadius(event.target.value)}/>
                </div>
                <div>
                    <label>N</label>
                    <input
                        placeholder={"Count"}
                        value={count}
                        onChange={(event) => setCount(event.target.value)}/>
                </div>
                <div>
                    <label>I (А)</label>
                    <input
                        placeholder={"Current"}
                        value={current}
                        onChange={(event) => setCurrent(event.target.value)}/>
                </div>
                <div>
                    <label>x start (м)</label>
                    <input
                        placeholder={"X start"}
                        value={xStartState}
                        onChange={(event) => setXStart(event.target.value)}/>
                </div>
                <div>
                    <label>x end (м)</label>
                    <input
                        placeholder={"X end"}
                        value={xEndState}
                        onChange={(event) => setXEnd(event.target.value)}/>
                </div>
            </div>
            <div>

                <Plot
                    width={600}
                    height={600}
                    margin={{bottom: 50, left: 90, top: 50, right: 100}}
                >
                    <Heading
                        title="Helmholtz"
                        subtitle="Magnetic field"
                    />
                    <LineSeries
                        data={plot()}
                        xAxis="x"
                        yAxis="y"
                        lineStyle={{ strokeWidth: 3 }}
                        label="B(x)"
                        displayMarkers={false}
                    />
                    <Axis
                        id="x"
                        position="bottom"
                        label="x, м"
                        displayPrimaryGridLines
                    />
                    <Axis
                        id="y"
                        position="left"
                        label="B, Тл"
                        displayPrimaryGridLines
                    />
                    <Legend position="right" />
                </Plot>

            </div>
        </div>
    )
}

export default App
