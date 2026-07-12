import { Fragment, useRef } from 'react'
import Editable, { clearAll } from './Editable.jsx'

const DAYS = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
]

const THEMES = [
  {
    key: 'morning',
    name: 'Morning Momentum',
    time: '06:30–09:00',
    className: 'row-morning',
    desc: 'One critical, cognitively hard task. Before phone, before email. Do it while the room is still cool.',
  },
  {
    key: 'flex',
    name: 'Flex Zone',
    time: '09:00–19:00',
    className: 'row-flex',
    desc: "Work, lectures, gym, errands. Exceptions live here — that's expected, not a failure.",
  },
  {
    key: 'winddown',
    name: 'Social & Wind-Down',
    time: '19:00–22:30',
    className: 'row-winddown',
    desc: "People, rest, screens off by 22:00. Set tomorrow's 3 non-negotiables before bed.",
  },
]

function buildAllKeys() {
  const keys = ['weekof', ...DAYS.map((d) => `date-${d.key}`)]
  DAYS.forEach((d) => THEMES.forEach((t) => keys.push(`${d.key}-${t.key}`)))
  return keys
}

export default function App() {
  const gridRef = useRef(null)

  const handlePrint = () => window.print()

  const handleClear = () => {
    if (!window.confirm('Clear all tasks and dates for this week?')) return
    clearAll(buildAllKeys())
    window.location.reload()
  }

  return (
    <div className="sheet">
      <div className="topbar">
        <div>
          <h1>Weekly Rhythm</h1>
          <div className="sub">
            Energy over time. Don&apos;t schedule hours — drop each task into
            the theme it belongs to, then work through the block whenever
            your energy matches it.
          </div>
        </div>
        <div>
          <div className="week-field">
            Week of&nbsp;
            <Editable as="span" storageKey="weekof" className="weekof-input" />
          </div>
          <div className="controls">
            <button className="action secondary" onClick={handleClear}>
              Clear week
            </button>
            <button className="action" onClick={handlePrint}>
              Print
            </button>
          </div>
        </div>
      </div>

      <div className="legend">
        {THEMES.map((t) => (
          <div key={t.key} className={`chip chip-${t.key}`}>
            <div className="name">{t.name}</div>
            <div className="time">{t.time}</div>
            <div className="desc">{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="grid" ref={gridRef}>
        <div className="cornercell" />
        {DAYS.map((d) => (
          <div className="daycell" key={d.key}>
            <div className="dow">{d.label}</div>
            <Editable
              as="div"
              className="date"
              storageKey={`date-${d.key}`}
            />
          </div>
        ))}

        <div className="barlabel">THEMES →</div>
        {DAYS.map((d) => (
          <div className="barcell" key={`bar-${d.key}`}>
            <div className="bar">
              <div className="seg-morning" />
              <div className="seg-flex" />
              <div className="seg-winddown" />
            </div>
          </div>
        ))}

        {THEMES.map((t) => (
          <Fragment key={t.key}>
            <div className={`rowlabel ${t.className}`}>
              <div className="name">{t.name}</div>
              <div className="time">{t.time}</div>
            </div>
            {DAYS.map((d) => (
              <Editable
                key={`${d.key}-${t.key}`}
                as="div"
                className={`taskcell ${t.className}`}
                storageKey={`${d.key}-${t.key}`}
                placeholder="+ task"
              />
            ))}
          </Fragment>
        ))}
      </div>

      <div className="footer">
        <div className="rule-box">
          <b>Never miss twice.</b> Skipping a block once is an exception.
          Skipping it two days running is a new habit — that&apos;s the only
          rule worth enforcing.
        </div>
        <div className="rule-box">
          <b>MVE fallback.</b> Too tired for the real task? Do 10% of it —
          five lines of code, one page, a 20-minute walk. Starting beats the
          plan.
        </div>
      </div>
    </div>
  )
}
