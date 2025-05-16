import { useEffect, useState } from 'react'
import { parsePartJson } from 'parse-part-json'
import ReactJson from 'react-json-view'
import './App.css'

const ParseSvg = () => {
  return (
    <svg
      viewBox="0 0 1505 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="17493"
      width="70"
      height="70">
      <path
        fill="#fff"
        d="M227.83021864 224.558766h537.088236l0.906223-176.562471c0.151037-42.743524 51.956792-64.039767 82.16423-33.83233L1311.06892164 478.30124c18.879648 18.879648 18.728611 49.38916-0.151037 68.268808L843.30675464 1009.952137c-30.509512 30.207437-82.315267 8.458082-82.013192-34.436479l0.755186-170.974095H227.83021864c-26.28047 0-47.425677-21.296243-47.425676-47.425676V271.984443C180.25350564 245.703972 201.54974864 224.558766 227.83021864 224.558766z"
        p-id="17494"></path>
    </svg>
  )
}
const defaultJson = '{"name": "John", "age": 30,"marry": true }'
const isBasic = (value: any) => {
  return typeof value !== 'object' || value === null
}
function App() {
  const [demoText, setDemoText] = useState(defaultJson)
  useEffect(() => {
    let demoTextAnimEndIndex = 0
    let end = false
    const anim = async () => {
      let isAdd = true
      while (!end) {
        if (demoTextAnimEndIndex >= defaultJson.length) {
          isAdd = false
          await new Promise((resolve) => setTimeout(resolve, 500))
        } else if (demoTextAnimEndIndex < 0) {
          isAdd = true
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
        demoTextAnimEndIndex += isAdd ? 1 : -1
        setDemoText(defaultJson.slice(0, demoTextAnimEndIndex))
        await new Promise((resolve) => setTimeout(resolve, 120))
      }
    }
    anim()
    return () => {
      end = true
    }
  }, [])
  const [inputText, setInputText] = useState(defaultJson)
  let parseDemoJson = null
  let parseDemoJsonErr = null
  let parseInputJson = null
  let parseInputJsonErr = null
  try {
    parseDemoJson = parsePartJson(demoText)
  } catch (e: any) {
    parseDemoJsonErr = e.toString()
  }
  try {
    parseInputJson = parsePartJson(inputText)
  } catch (e: any) {
    parseInputJsonErr = e.toString()
  }
  return (
    <>
      <div className="box">
        <h1>parse-part-json Example</h1>
        <div className="card">
          <div className="input-box">{demoText}</div>
          <div className="dir">
            <ParseSvg />
            <span>parse</span>
          </div>
          <div className="out-box">
            {parseDemoJsonErr ? (
              <div className="err">{parseDemoJsonErr}</div>
            ) : isBasic(parseDemoJson) ? (
              <span>{String(parseDemoJson)}</span>
            ) : (
              <ReactJson
                name={null}
                displayObjectSize={false}
                style={{
                  fontFamily: `'Roboto', sans-serif`,
                }}
                displayDataTypes={false}
                enableClipboard={false}
                theme={'harmonic'}
                collapsed={false}
                src={parseDemoJson}
              />
            )}
          </div>
        </div>
        <div className="card">
          <div className="input-box">
            <textarea
              placeholder="input json"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}></textarea>
          </div>
          <div className="dir">
            <ParseSvg />
            <span>parse</span>
          </div>
          <div className="out-box">
            {parseInputJsonErr ? (
              <div className="err">{parseInputJsonErr}</div>
            ) : isBasic(parseInputJson) ? (
              <span>{String(parseInputJson)}</span>
            ) : (
              <ReactJson
                name={null}
                displayObjectSize={false}
                style={{
                  fontFamily: `'Roboto', sans-serif`,
                }}
                displayDataTypes={false}
                enableClipboard={false}
                theme={'harmonic'}
                collapsed={false}
                src={parseInputJson}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
