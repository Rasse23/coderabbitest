import { useRef, useState } from "react";
import "./App.css";

const saunas = [
  {
    id: "shore",
    name: "The shore sauna",
    description: "A gentle heat. A few steps to the water.",
    heat: "70–80°C",
    capacity: "Up to 6 guests",
    price: 32,
    detail:
      "Our traditional wood-fired sauna, with a private changing room and a sheltered terrace.",
  },
  {
    id: "smoke",
    name: "The smoke sauna",
    description: "Slow warmth, seasoned by birch smoke.",
    heat: "60–70°C",
    capacity: "Up to 4 guests",
    price: 44,
    detail:
      "A softer, lingering heat in a timber sauna warmed for hours before your arrival.",
  },
];
const sessions = ["10:00", "13:00", "16:00", "19:00"];
function localDate(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function LakeMark({ className = "" }) {
  return (
    <svg
      className={className}
      width="42"
      height="37"
      viewBox="0 0 42 37"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 22c5-7 9 7 15 0s10 7 15 0M6 30c5-7 9 7 15 0s10 7 15 0M15 15c-5-5 5-6 0-12m10 12c-5-5 5-6 0-12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function App() {
  const [selected, setSelected] = useState("shore");
  const [date, setDate] = useState(localDate(1));
  const [time, setTime] = useState("16:00");
  const [guests, setGuests] = useState("2");
  const [plan, setPlan] = useState(null);
  const dialog = useRef(null);
  const sauna = saunas.find((item) => item.id === selected);

  function chooseSauna(id) {
    setSelected(id);
    if (id === "smoke" && Number(guests) > 4) setGuests("4");
  }
  function previewBooking(event) {
    event.preventDefault();
    if (date < localDate()) {
      event.currentTarget.elements.date.setCustomValidity(
        "Choose today or a later date.",
      );
      event.currentTarget.elements.date.reportValidity();
      return;
    }
    setPlan({
      sauna: sauna.name,
      date,
      time,
      guests,
      total: sauna.price * Number(guests),
    });
    dialog.current.showModal();
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header wrap">
        <a className="brand" href="#" aria-label="Tyyni home">
          <LakeMark />
          <span>
            tyyni<span className="brand-dot">.</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#saunas">Our saunas</a>
          <a href="#ritual">The ritual</a>
          <a href="#visit">Your visit</a>
        </nav>
        <a className="header-book" href="#booking">
          Find your moment <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="location">
              <span className="location-dot" /> A little closer to stillness
            </div>
            <h1 id="hero-title">
              Warmth.
              <br />
              Water.
              <br />
              Nothing else.
            </h1>
            <p>
              Leave the hurry on the shore. Find your own rhythm between a
              wood-fired sauna and the quiet of a Finnish lake.
            </p>
            <a className="button primary" href="#booking">
              Find your sauna session <span aria-hidden="true">↗</span>
            </a>
            <div className="hero-note">
              <span className="small-wave" aria-hidden="true">
                ≈
              </span>
              <span>Wood-fired. Lakeside. Unhurried.</span>
            </div>
          </div>
          <figure className="hero-photo">
            <img
              src="/images/lakeside-cabin.jpg"
              alt="A glowing timber cabin beside still water, surrounded by snow-covered evergreens"
              fetchPriority="high"
            />
            <figcaption>
              <span>A quieter kind of escape</span>
              <span>Finland, in spirit</span>
            </figcaption>
            <div className="photo-stamp" aria-hidden="true">
              <LakeMark />
              <span>
                Take your
                <br />
                time here.
              </span>
            </div>
          </figure>
        </section>

        <section
          className="intro-band"
          id="ritual"
          aria-labelledby="ritual-title"
        >
          <div className="wrap ritual-content">
            <div className="ritual-symbol" aria-hidden="true">
              löyly
            </div>
            <div>
              <h2 id="ritual-title">
                There’s a Finnish word for this feeling.
              </h2>
              <p>
                Löyly is the steam that rises when water meets hot stones. Feel
                the warmth, step into the fresh air, and return when you’re
                ready. There’s no right pace but yours.
              </p>
            </div>
            <span className="ritual-translation">
              /ˈløy̯ly/
              <br />A little steam.
              <br />A little peace.
            </span>
          </div>
        </section>

        <section
          className="sauna-section wrap"
          id="saunas"
          aria-labelledby="saunas-title"
        >
          <div className="section-heading">
            <h2 id="saunas-title">
              Two saunas.
              <br />
              Your kind of quiet.
            </h2>
            <p>
              Different characters, the same simple ritual.
              <br />
              Every session gives you two hours to settle in.
            </p>
          </div>
          <div className="sauna-options">
            {saunas.map((item) => (
              <button
                type="button"
                className={`sauna-option ${selected === item.id ? "is-selected" : ""}`}
                key={item.id}
                onClick={() => chooseSauna(item.id)}
                aria-pressed={selected === item.id}
              >
                <div className="sauna-option-top">
                  <span className="selection-indicator" aria-hidden="true">
                    {selected === item.id ? "✓" : ""}
                  </span>
                  <span>{item.heat}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="sauna-option-bottom">
                  <span>{item.capacity}</span>
                  <span>
                    <strong>€{item.price}</strong> / guest
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          className="booking-section wrap"
          id="booking"
          aria-labelledby="booking-title"
        >
          <div className="booking-copy">
            <span className="booking-icon" aria-hidden="true">
              <LakeMark />
            </span>
            <h2 id="booking-title">
              Make room
              <br />
              for a slower day.
            </h2>
            <p>{sauna.detail}</p>
            <p className="included">
              Two hours of sauna, a fresh towel,
              <br />
              and all the time in between.
            </p>
          </div>
          <form className="booking-form" onSubmit={previewBooking}>
            <div className="form-heading">
              <h3>Your sauna session</h3>
              <span>2 hours</span>
            </div>
            <label htmlFor="sauna">Sauna</label>
            <select
              id="sauna"
              value={selected}
              onChange={(event) => chooseSauna(event.target.value)}
            >
              {saunas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="form-row">
              <div>
                <label htmlFor="date">Day</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={localDate()}
                  value={date}
                  onChange={(event) => {
                    event.target.setCustomValidity("");
                    setDate(event.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="guests">Guests</label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(event) => setGuests(event.target.value)}
                >
                  {Array.from(
                    { length: selected === "smoke" ? 4 : 6 },
                    (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "guest" : "guests"}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
            <fieldset>
              <legend>Start time</legend>
              <div className="time-options">
                {sessions.map((session) => (
                  <label
                    className={time === session ? "chosen-time" : ""}
                    key={session}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={session}
                      checked={time === session}
                      onChange={() => setTime(session)}
                    />
                    <span>{session}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="booking-total">
              <span>
                €{sauna.price} × {guests}{" "}
                {Number(guests) === 1 ? "guest" : "guests"}
              </span>
              <strong>€{sauna.price * Number(guests)}</strong>
            </div>
            <button className="button primary" type="submit">
              Preview your session <span aria-hidden="true">↗</span>
            </button>
            <p className="booking-disclaimer">
              A concept booking experience. No reservation or payment.
            </p>
          </form>
        </section>

        <section
          className="visit-section wrap"
          id="visit"
          aria-labelledby="visit-title"
        >
          <h2 id="visit-title">
            Come as you are.
            <br />
            Leave a little lighter.
          </h2>
          <div className="visit-details">
            <details>
              <summary>Is this your first sauna?</summary>
              <p>
                You’re in good company. Start on a lower bench, take breaks, and
                drink water. You can skip the cold dip entirely.
              </p>
            </details>
            <details>
              <summary>What should you bring?</summary>
              <p>
                A swimsuit, a water bottle, and sandals for the shore. A towel
                is included in your session.
              </p>
            </details>
            <details>
              <summary>How does the session work?</summary>
              <p>
                Your two-hour session includes time to change, warm up, and
                relax. These are shared sauna sessions with a small group of
                guests.
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className="wrap">
        <a className="brand" href="#" aria-label="Tyyni home">
          <LakeMark />
          <span>tyyni.</span>
        </a>
        <p>Finnish for calm. A place to practice it.</p>
        <span>A fictional retreat, made for a slower moment.</span>
      </footer>

      <dialog
        ref={dialog}
        className="plan-dialog"
        aria-labelledby="plan-title"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        {plan && (
          <>
            <button
              className="dialog-close"
              type="button"
              aria-label="Close session preview"
              onClick={() => dialog.current.close()}
            >
              ×
            </button>
            <LakeMark />
            <h2 id="plan-title">
              Your slower day,
              <br />
              planned.
            </h2>
            <p className="plan-intro">Here’s a look at your chosen session.</p>
            <dl>
              <div>
                <dt>Sauna</dt>
                <dd>{plan.sauna}</dd>
              </div>
              <div>
                <dt>Day</dt>
                <dd>
                  {new Date(`${plan.date}T12:00:00`).toLocaleDateString(
                    "en-GB",
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{plan.time} (Finland time), 2 hours</dd>
              </div>
              <div>
                <dt>Guests</dt>
                <dd>{plan.guests}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd>€{plan.total}</dd>
              </div>
            </dl>
            <p className="preview-note">
              This is a preview. No reservation has been made and no payment has
              been taken.
            </p>
            <button
              className="button primary"
              onClick={() => dialog.current.close()}
            >
              Keep planning
            </button>
          </>
        )}
      </dialog>
    </>
  );
}

export default App;
